<?php

function register_emploi_cpt() {
    $labels = [
        'name' => _x('Emplois', 'Post type general name', 'emploi'),
        'singular_name' => _x('Emploi', 'Post type singular name', 'emploi'),
        'menu_name' => _x('Emplois', 'Admin Menu text', 'emploi'),
        'name_admin_bar' => _x('Emploi', 'Add New on Toolbar', 'emploi'),
        'add_new' => __('Ajouter', 'emploi'),
        'add_new_item' => __('Ajouter un nouvel emploi', 'emploi'),
        'new_item' => __('Nouvel emploi', 'emploi'),
        'edit_item' => __('Éditer l\'emploi', 'emploi'),
        'view_item' => __('Voir l\'emploi', 'emploi'),
        'all_items' => __('Tous les emplois', 'emploi'),
        'search_items' => __('Rechercher un emploi', 'emploi'),
        'not_found' => __('Aucun emploi trouvé', 'emploi'),
        'not_found_in_trash' => __('Aucun emploi trouvé dans la corbeille', 'emploi'),
    ];

    $args = [
        'labels' => $labels,
        'description' => 'Emploi custom post type.',
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'emploi'],
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => 20,
        'menu_icon' => 'dashicons-businessman',
        'supports' => ['title', 'editor', 'author', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'emploi',
        'graphql_plural_name' => 'emplois',
    ];

    register_post_type('Emploi', $args);
}
add_action('init', 'register_emploi_cpt');
