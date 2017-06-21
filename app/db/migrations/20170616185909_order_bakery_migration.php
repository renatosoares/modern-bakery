<?php

use Phinx\Migration\AbstractMigration;

class OrderBakeryMigration extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     *
     *
    ->addColumn('deleted_at', 'timestamp')
     */
    public function change()
    {
        $table = $this->table('order_bakery');
        $table
            ->addColumn('product', 'string')
            ->addColumn('queue', 'boolean')
            ->addColumn('available', 'boolean')
            ->addColumn('delivered', 'boolean')
            ->addTimestamps()
            ->create();
    }
}
