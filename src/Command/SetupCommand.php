<?php

declare(strict_types=1);

namespace App\Command;

use App\Entity\Action;
use App\Repository\ActionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:setup', description: 'Initialize data')]
class SetupCommand extends Command
{
    private string $kernelProjectDir;

    public function __construct(private EntityManagerInterface $entityManager,
                                private ActionRepository $actionRepository,
                                string $kernelProjectDir)
    {
        parent::__construct();

        $this->kernelProjectDir = $kernelProjectDir;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $connection = $this->entityManager->getConnection();

        //add actions
        $file = file_get_contents($this->kernelProjectDir.'/src/DataFixtures/feed.sql');
        if ($file) {
            $sql = 'SELECT COUNT(*) AS total FROM action';
            $count = $connection->fetchAssociative($sql);

            if (true === isset($count['total']) && 0 == $count['total']) {
                foreach (explode("\n", $file) as $sqlStatement) {
                    if ($sqlStatement) {
                        $connection->executeQuery($sqlStatement);
                    }
                }
                $output->writeln('<info>Feed data inserted</info>');
            } else {
                $output->writeln('<comment>Feed data already inserted</comment>');
            }
        }

        $table = new Table($output);
        $table->setHeaders(['id','title']);
        /** @var Action $action */
        foreach ($this->actionRepository->findAll() as $action) {
            $table->addRow([
                $action->getId(),
                $action->getTitle()
            ]);
        }
        $table->render();

        return Command::SUCCESS;
    }
}
