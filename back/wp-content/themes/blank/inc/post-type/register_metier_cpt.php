<?php

function register_metier_cpt() {
    $labels = [
        'name' => _x('Metiers', 'Post type general name', 'metier'),
        'singular_name' => _x('Metier', 'Post type singular name', 'metier'),
        'menu_name' => _x('Metiers', 'Admin Menu text', 'metier'),
        'name_admin_bar' => _x('Metier', 'Add New on Toolbar', 'metier'),
        'add_new' => __('Ajouter', 'metier'),
        'add_new_item' => __('Ajouter un nouveau métier', 'metier'),
        'new_item' => __('Nouveau métier', 'metier'),
        'edit_item' => __('Éditer le métier', 'metier'),
        'view_item' => __('Voir le métier', 'metier'),
        'all_items' => __('Tous les métiers', 'metier'),
        'search_items' => __('Rechercher un métier', 'metier'),
        'not_found' => __('Aucun métier trouvé', 'metier'),
        'not_found_in_trash' => __('Aucun métier trouvé dans la corbeille', 'metier'),
    ];

    $args = [
        'labels' => $labels,
        'description' => 'Metier custom post type.',
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'metier'],
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => 20,
        'menu_icon' => 'dashicons-id-alt',
        'supports' => ['title', 'editor', 'author', 'thumbnail', 'excerpt'],
        'show_in_rest' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'metier',
        'graphql_plural_name' => 'metiers',
    ];

    register_post_type('Metier', $args);
}
add_action('init', 'register_metier_cpt');
