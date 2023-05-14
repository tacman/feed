<?php

declare(strict_types=1);

namespace App\Controller;

use App\Controller\AbstractAppController;
use App\Entity\ActionCategory;
use App\Entity\Category;
use App\Entity\Member;
use App\Form\Type\CategoryType;
use App\Manager\ActionCategoryManager;
use App\Manager\ActionManager;
use App\Manager\CategoryManager;
use App\Model\QueryParameterFilterModel;
use App\Model\QueryParameterSortModel;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/api', name: 'api_categories_', priority: 15)]
class CategoryController extends AbstractAppController
{
    private ActionManager $actionManager;
    private ActionCategoryManager $actionCategoryManager;
    private CategoryManager $categoryManager;

    public function __construct(ActionManager $actionManager, ActionCategoryManager $actionCategoryManager, CategoryManager $categoryManager)
    {
        $this->actionManager = $actionManager;
        $this->actionCategoryManager = $actionCategoryManager;
        $this->categoryManager = $categoryManager;
    }

    #[Route(path: '/categories', name: 'index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        $data = [];
        $included = [];

        $this->denyAccessUnlessGranted('LIST', 'category');

        $filtersModel = new QueryParameterFilterModel($request->query->all('filter'));

        $parameters = [];

        if ($filtersModel->getBool('excluded')) {
            $parameters['excluded'] = true;
            $parameters['member'] = $this->getMember();
        }

        if ($filtersModel->getBool('usedbyfeeds')) {
            $parameters['usedbyfeeds'] = true;
        }

        if ($filtersModel->getInt('days')) {
            $parameters['days'] = $filtersModel->getInt('days');
        }

        $sortModel = new QueryParameterSortModel($request->query->get('sort'));

        if ($sortGet = $sortModel->get()) {
            $parameters['sortDirection'] = $sortGet['direction'];
            $parameters['sortField'] = $sortGet['field'];
        } else {
            $parameters['sortDirection'] = 'ASC';
            $parameters['sortField'] = 'cat.title';
        }

        $parameters['returnQueryBuilder'] = true;

        $pagination = $this->paginateAbstract($request, $this->categoryManager->getList($parameters));

        $data['entries_entity'] = 'category';
        $data = array_merge($data, $this->jsonApi($request, $pagination, $sortModel, $filtersModel));

        $data['data'] = [];

        $ids = [];
        foreach ($pagination as $result) {
            $ids[] = $result['id'];
        }

        $results = $this->actionCategoryManager->getList(['member' => $this->getMember(), 'categories' => $ids])->getResult();
        $actions = [];
        foreach ($results as $actionCategory) {
            $included['action-'.$actionCategory->getAction()->getId()] = $actionCategory->getAction()->getJsonApiData();
            $actions[$actionCategory->getCategory()->getId()][] = $actionCategory->getAction()->getId();
        }

        foreach ($pagination as $result) {
            $category = $this->categoryManager->getOne(['id' => $result['id']]);
            if ($category) {
                $entry = $category->getJsonApiData();

                if (true === isset($actions[$result['id']])) {
                    $entry['relationships']['actions'] = [
                        'data' => [],
                    ];
                    foreach ($actions[$result['id']] as $actionId) {
                        $entry['relationships']['actions']['data'][] = [
                            'id'=> strval($actionId),
                            'type' => 'action',
                        ];
                    }
                }

                $data['data'][] = $entry;
            }
        }

        if (0 < count($included)) {
            $data['included'] = array_values($included);
        }

        return $this->jsonResponse($data);
    }

    #[Route(path: '/categories', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = [];

        $this->denyAccessUnlessGranted('CREATE', 'category');

        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);

        $content = $this->getContent($request);
        $form->submit($content);

        if ($form->isValid()) {
            $this->categoryManager->persist($form->getData());

            $data['data'] = $category->getJsonApiData();
        } else {
            $data = $this->getFormErrors($form);
            return $this->jsonResponse($data, JsonResponse::HTTP_BAD_REQUEST);
        }

        return $this->jsonResponse($data, JsonResponse::HTTP_CREATED);
    }

    #[Route('/category/{id}', name: 'read', methods: ['GET'])]
    public function read(Request $request, int $id): JsonResponse
    {
        $data = [];

        $category = $this->categoryManager->getOne(['id' => $id]);

        if (!$category) {
            return $this->jsonResponse($data, JsonResponse::HTTP_NOT_FOUND);
        }

        $this->denyAccessUnlessGranted('READ', $category);

        $data['data'] = [];
        $included = [];

        $entry = $category->getJsonApiData();

        $results = $this->actionCategoryManager->getList(['member' => $this->getMember(), 'category' => $category])->getResult();
        $actions = [];
        foreach ($results as $actionCategory) {
            $included['action-'.$actionCategory->getAction()->getId()] = $actionCategory->getAction()->getJsonApiData();
            $actions[$actionCategory->getCategory()->getId()][] = $actionCategory->getAction()->getId();
        }

        if (true === isset($actions[$entry['id']])) {
            $entry['relationships']['actions'] = [
                'data' => [],
            ];
            foreach ($actions[$entry['id']] as $actionId) {
                $entry['relationships']['actions']['data'][] = [
                    'id'=> strval($actionId),
                    'type' => 'action',
                ];
            }
        }

        $data['data'] = $entry;

        if (0 < count($included)) {
            $data['included'] = array_values($included);
        }

        return $this->jsonResponse($data);
    }

    #[Route('/category/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $data = [];

        $category = $this->categoryManager->getOne(['id' => $id]);

        if (!$category) {
            return $this->jsonResponse($data, JsonResponse::HTTP_NOT_FOUND);
        }

        $this->denyAccessUnlessGranted('UPDATE', $category);

        $form = $this->createForm(CategoryType::class, $category);

        $content = $this->getContent($request);
        $form->submit($content);

        if ($form->isValid()) {
            $this->categoryManager->persist($form->getData());

            $data['data'] = $category->getJsonApiData();
        } else {
            $data = $this->getFormErrors($form);
            return $this->jsonResponse($data, JsonResponse::HTTP_BAD_REQUEST);
        }

        return $this->jsonResponse($data);
    }

    #[Route('/category/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Request $request, int $id): JsonResponse
    {
        $data = [];

        $category = $this->categoryManager->getOne(['id' => $id]);

        if (!$category) {
            return $this->jsonResponse($data, JsonResponse::HTTP_NOT_FOUND);
        }

        $this->denyAccessUnlessGranted('DELETE', $category);

        $data['data'] = $category->getJsonApiData();

        $this->categoryManager->remove($category);

        return $this->jsonResponse($data);
    }

    #[Route('/category/action/exclude/{id}', name: 'action_exclude', methods: ['GET'])]
    public function actionExclude(Request $request, int $id): JsonResponse
    {
        return $this->setAction('exclude', $request, $id);
    }

    private function setAction(string $case, Request $request, int $id): JsonResponse
    {
        $data = [];

        $category = $this->categoryManager->getOne(['id' => $id]);

        if (!$category) {
            return $this->jsonResponse($data, JsonResponse::HTTP_NOT_FOUND);
        }

        $action = $this->actionManager->getOne(['title' => $case]);

        if (!$action) {
            return $this->jsonResponse($data, JsonResponse::HTTP_NOT_FOUND);
        }

        $this->denyAccessUnlessGranted('ACTION_'.strtoupper($case), $category);

        if ($actionCategory = $this->actionCategoryManager->getOne([
            'action' => $action,
            'category' => $category,
            'member' => $this->getMember(),
        ])) {
            $this->actionCategoryManager->remove($actionCategory);

            $data['action'] = $action->getReverse() ? $action->getReverse()->getTitle() : null;
            $data['action_reverse'] = $action->getTitle();

            if ($action->getReverse()) {
                if ($actionCategoryReverse = $this->actionCategoryManager->getOne([
                    'action' => $action->getReverse(),
                    'category' => $category,
                    'member' => $this->getMember(),
                ])) {
                } else {
                    $actionCategoryReverse = new ActionCategory();
                    $actionCategoryReverse->setAction($action->getReverse());
                    $actionCategoryReverse->setCategory($category);
                    $actionCategoryReverse->setMember($this->getMember());
                    $this->actionCategoryManager->persist($actionCategoryReverse);
                }
            }
        } else {
            $actionCategory = new ActionCategory();
            $actionCategory->setAction($action);
            $actionCategory->setCategory($category);
            $actionCategory->setMember($this->getMember());
            $this->actionCategoryManager->persist($actionCategory);

            $data['action'] = $action->getTitle();
            $data['action_reverse'] = $action->getReverse() ? $action->getReverse()->getTitle() : null;

            if ($action->getReverse()) {
                if ($actionCategoryReverse = $this->actionCategoryManager->getOne([
                    'action' => $action->getReverse(),
                    'category' => $category,
                    'member' => $this->getMember(),
                ])) {
                    $this->actionCategoryManager->remove($actionCategoryReverse);
                }
            }
        }

        $data['data'] = $category->getJsonApiData();

        return $this->jsonResponse($data);
    }

    #[Route(path: '/categories/trendy', name: 'trendy', methods: ['GET'])]
    public function trendy(Request $request): JsonResponse
    {
        $data = [];

        $this->denyAccessUnlessGranted('LIST', 'category');

        $parameters = [];

        $parameters['trendy'] = true;

        if ($this->getMember()) {
            $parameters['member'] = $this->getMember();
        }

        $results = $this->categoryManager->getList($parameters);

        $data['entries'] = [];

        $max = false;
        foreach ($results as $row) {
            if (!$max) {
                $max = $row['count'];
            }
            $data['entries'][$row['ref']] = ['count' => $row['count'], 'id' => $row['id']];
        }

        foreach ($data['entries'] as $k => $v) {
            $percent = ($v['count'] * 100) / $max;
            $percent = $percent - ($percent % 10);
            $percent = intval($percent) + 100;
            $data['entries'][$k]['percent'] = $percent;
        }

        return $this->jsonResponse($data);
    }
}
