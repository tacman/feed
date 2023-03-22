<?php

namespace App\Manager;

use App\Entity\Item;
use App\Event\ItemEvent;
use App\Manager\AbstractManager;
use App\Manager\EnclosureManager;
use App\Repository\ItemRepository;
use Symfony\Component\HttpFoundation\Request;

class ItemManager extends AbstractManager
{
    private ItemRepository $itemRepository;

    public EnclosureManager $enclosureManager;

    public function __construct(ItemRepository $itemRepository, EnclosureManager $enclosureManager)
    {
        $this->itemRepository = $itemRepository;
        $this->enclosureManager = $enclosureManager;
    }

    /**
     * @param array<mixed> $parameters
     */
    public function getOne(array $parameters = []): ?Item
    {
        return $this->itemRepository->getOne($parameters);
    }

    /**
     * @param array<mixed> $parameters
     */
    public function getList(array $parameters = []): mixed
    {
        return $this->itemRepository->getList($parameters);
    }

    public function init(): Item
    {
        return new Item();
    }

    public function persist(Item $data): int
    {
        if ($data->getDateCreated() == null) {
            $eventName = ItemEvent::CREATED;
            $data->setDateCreated(new \Datetime());
        } else {
            $eventName = ItemEvent::UPDATED;
        }
        $data->setDateModified(new \Datetime());

        $this->entityManager->persist($data);
        $this->entityManager->flush();

        $event = new ItemEvent($data);
        $this->eventDispatcher->dispatch($event, $eventName);

        $this->clearCache();

        return $data->getId();
    }

    public function remove(Item $data): void
    {
        $event = new ItemEvent($data);
        $this->eventDispatcher->dispatch($event, ItemEvent::DELETED);

        $this->entityManager->remove($data);
        $this->entityManager->flush();

        $this->clearCache();
    }

    /**
     * @return array<mixed>
     */
    public function prepareEnclosures(Item $item, Request $request): array
    {
        $enclosures = [];
        $index_enclosures = 0;
        foreach ($this->enclosureManager->getList(['item' => $item])->getResult() as $enclosure) {
            $src = $enclosure->getLink();
            if (!strstr($item->getContent(), $src)) {
                $enclosures[$index_enclosures] = $enclosure->toArray();
                if (!$enclosure->isLinkSecure() && $request->server->get('HTTPS') == 'on' && $enclosure->getTypeGroup() == 'image') {
                    $token = urlencode(base64_encode($src));
                    $enclosures[$index_enclosures]['link'] = 'app/icons/icon-32x32.png';
                    $enclosures[$index_enclosures]['link_origin'] = $src;
                    $enclosures[$index_enclosures]['proxy'] = $this->router->generate('api_proxy', ['token' => $token], 0);
                }
                $index_enclosures++;
            }
        }
        return $enclosures;
    }

    /**
     * @param array<mixed> $parameters
     */
    public function readAll(array $parameters = []): void
    {
        foreach ($this->itemRepository->getList($parameters)->getResult() as $result) {
            $sql = 'SELECT id FROM action_item WHERE member_id = :member_id AND item_id = :item_id AND action_id = :action_id';
            $stmt = $this->connection->prepare($sql);
            $stmt->bindValue('member_id', $parameters['member']->getId());
            $stmt->bindValue('item_id', $result['id']);
            $stmt->bindValue('action_id', 1);
            $resultSet = $stmt->executeQuery();
            $test = $resultSet->fetchAssociative();

            if ($test) {
            } else {
                $insertActionItem = [
                    'member_id' => $parameters['member']->getId(),
                    'item_id' => $result['id'],
                    'action_id' => 1,
                    'date_created' => (new \Datetime())->format('Y-m-d H:i:s'),
                ];
                $this->insert('action_item', $insertActionItem);

                $sql = 'DELETE FROM action_item WHERE action_id = :action_id AND item_id = :item_id AND member_id = :member_id';
                $stmt = $this->connection->prepare($sql);
                $stmt->bindValue('action_id', 12);
                $stmt->bindValue('item_id', $result['id']);
                $stmt->bindValue('member_id', $parameters['member']->getId());
                $resultSet = $stmt->executeQuery();
            }
        }
    }
}