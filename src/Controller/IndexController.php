<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractAppController
{
    #[Route(path: '/', name: 'index', methods: ['GET'])]
    public function index(): Response
    {
        $response = new Response();
        $response->headers->set('X-Frame-Options', 'sameorigin');
        return $this->render('base.html.twig', [], $response);
    }
}