<?php

declare(strict_types=1);

namespace App\Tests\Manager;

use App\Entity\Feed;
use App\Manager\FeedManager;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class FeedManagerTest extends KernelTestCase
{
    protected FeedManager $feedManager;

    protected function setUp(): void
    {
        self::bootKernel();

        $this->feedManager = static::getContainer()->get('App\Manager\FeedManager');
    }

    public function testPersist(): void
    {
        $feed = new Feed();
        $feed->setTitle('test-'.uniqid('', true));
        $feed->setLink('test-'.uniqid('', true));

        $this->feedManager->persist($feed);

        $test = $this->feedManager->getOne(['id' => $feed->getId()]);
        $this->assertNotNull($test);
        $this->assertInstanceOf(Feed::class, $test);

        $this->feedManager->remove($feed);
    }
}
