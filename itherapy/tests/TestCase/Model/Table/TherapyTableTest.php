<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\TherapyTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\TherapyTable Test Case
 */
class TherapyTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\TherapyTable
     */
    public $Therapy;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.therapy',
        'app.users',
        'app.sessions'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Therapy') ? [] : ['className' => TherapyTable::class];
        $this->Therapy = TableRegistry::getTableLocator()->get('Therapy', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Therapy);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
