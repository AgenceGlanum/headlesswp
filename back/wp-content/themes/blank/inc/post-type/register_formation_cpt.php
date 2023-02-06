<?php

function register_formation_cpt() {
    $labels = [
        'name' => _x('Formations', 'Post type general name', 'formation'),
        'singular_name' => _x('Formation', 'Post type singular name', 'formation'),
        'menu_name' => _x('Formations', 'Admin Menu text', 'formation'),
        'name_admin_bar' => _x('Formation', 'Add New on Toolbar', 'formation'),
        'add_new' => __('Ajouter', 'formation'),
        'add_new_item' => __('Ajouter une nouvelle formation', 'formation'),
        'new_item' => __('Nouvelle formation', 'formation'),
        'edit_item' => __('Éditer la formation', 'formation'),
        'view_item' => __('Voir la formation', 'formation'),
        'all_items' => __('Toutes les formations', 'formation'),
        'search_items' => __('Rechercher une formation', 'formation'),
        'not_found' => __('Aucune formation trouvé', 'formation'),
        'not_found_in_trash' => __('Aucune formation trouvé dans la corbeille', 'formation'),
    ];

    $args = [
        'labels' => $labels,
        'description' => 'Formation custom post type.',
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'formation'],
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => 20,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => ['title', 'editor', 'author', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'formation',
        'graphql_plural_name' => 'formations',
    ];

    register_post_type('Formation', $args);
}
add_action('init', 'register_formation_cpt');
