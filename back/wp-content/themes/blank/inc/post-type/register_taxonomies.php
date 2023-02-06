<?php

function register_taxonomies() {
    // Taxonomy Famille de métier
    $labels = [
        'name' => 'Famille de métier',
        'new_item_name' => 'Nom d\'une nouvelle famille',
        'parent_item' => 'Famille parente'
    ];

    $args = [
        'labels' => $labels,
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'famille_metier',
        'graphql_plural_name' => 'familles_metier',
        'hierarchical' => false,
        'show_admin_column' => true,
    ];

    register_taxonomy(
        'famille_metier',
        [
            'metier',
            'formation',
            'emploi'
        ],
        $args
    );

    // Taxonomy Compétence
    $labels = [
        'name' => 'Compétence',
        'new_item_name' => 'Nom de la nouvelle compétence',
        'parent_item' => 'Compétence parente'
    ];

    $args = [
        'labels' => $labels,
        'public' => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'competence',
        'graphql_plural_name' => 'competences',
        'hierarchical' => true,
        'show_admin_column' => true,
    ];

    register_taxonomy(
        'competence',
        [
            'metier',
            'formation',
            'emploi'
        ],
        $args
    );
}
add_action('init', 'register_taxonomies');
