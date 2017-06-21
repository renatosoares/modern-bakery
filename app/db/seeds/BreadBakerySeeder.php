<?php

use Phinx\Seed\AbstractSeed;

class BreadBakerySeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
        $bread = [
            "Pão árabe",
            "Pão australiano",
            "Pão ázimo",
            "Pão branco",
            "Pão careca",
            "Pão com chouriço",
            "Pão da alma",
            "Pão de ajunta",
            "Pão de centeio",
            "Pão de forma",
            "Pão de leite",
            "Pão de mel",
            "Pão de Mafra",
            "Pão de minuto",
            "Pão de munição",
            "Pão de queijo",
            "Pão de saluga",
            "Pão francês",
            "Pão integral",
            "Pão italiano",
            "Pão português",
            "Pão preto",
            "Pão ralado",
            "Pão saloio",
            "Pão de semolina",
            "Pão sírio",
            "Pão sovado",
            "Pão sueco"
        ];
        $data = [];
        foreach ($bread as $b){
            $data[] = [
              'bread' => $b,
              'created_at' => date('Y-m-d H:i:s'),
              'updated_at' => date('Y-m-d H:i:s'),
            ];
        }
        $this->insert('bread_bakery', $data);
    }
}
