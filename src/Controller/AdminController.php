<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AdminController extends AbstractController
{
    private $security;
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine, Security $security)
    {
        $this->doctrine = $doctrine;
        $this->security = $security;
    }

    #[Route('/login', name: 'dcms_login')]
    public function index(AuthenticationUtils $authenticationUtils) :Response
    {
        if(!is_null($this->security->getUser()))
            return $this->json(true, 200);

        $ret = [
            'error' => $authenticationUtils->getLastAuthenticationError(),
            'lastUsername' => $authenticationUtils->getLastUsername()
        ];
        return $this->json($ret, 401);
    }

    #[Route('/dcms/{page}', defaults: ['page' => 'index'], methods: ['GET'])]
    public function page($page): Response
    {
        if($this->security->getUser() == null && $page != 'login')
            return $this->redirect('/dcms/login', 302);
        elseif($this->security->getUser() != null && $page == 'login')
            return $this->redirect('/dcms/index', 302);

        return $this->render('admin/pages/'.$page.'.html.twig');
    }

    public function test_page() {
        return $this->render('/firstPage.twig');
    }

    #[Route('/logout', name: 'dcms_logout')]
    public function logout() {
        return $this->json('Success');
    }
}
