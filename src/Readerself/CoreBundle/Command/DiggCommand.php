<?php
namespace Readerself\CoreBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class DiggCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('readerself:digg')
            ->setDescription('Import Digg feeds')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        date_default_timezone_set('UTC');
        $this->getContainer()->get('readerself_core_manager_digg')->start();
    }
}
