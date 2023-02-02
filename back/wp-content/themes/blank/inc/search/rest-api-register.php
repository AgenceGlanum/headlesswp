<?php

function getSearchDataCallback($data) {
    $target_url = '/';
    $this_url = site_url();

    $posts_data = [];
    $posts = get_posts([
        'post_type' => 'any',
        'posts_per_page' => -1
    ]
    );
    // Loop through the posts and push the desired data to the array we've initialized earlier in the form of an object
    foreach ($posts as $post) {
        $id = $post->ID;
        $post->searchData = [];
        // Push post content into search results
        if ($post->post_content > '') {
            // Replace wp site url with target url
            $content = str_replace($this_url, $target_url, $post->post_content);
            $post->searchData[] = $content;
        }

        // Push all acf fields into search results
        if (function_exists('get_fields')) {
            $fields = get_fields($id);
            if ($fields) {
                $iterator = new RecursiveIteratorIterator(new RecursiveArrayIterator($fields));
                foreach ($iterator as $key => $value) {
                    if (
                      $value !== null && $value !== '' &&   // check for empty strings
                      strlen($value) > 50 &&                  // remove small strings like button titles etc.
                      substr($value, 0, 4) !== 'http'        // remove links
                  ) {
                        // Replace wp site url with target url
                        $content = str_replace($this_url, $target_url, $value);
                        $post->searchData[] = $content;
                    }
                }
            }
        }

        $post->pathname = str_replace(site_url(), '', get_permalink($id));

        // Remove unnecessary post properties
        unset($post->post_content);
        unset($post->post_excerpt);
        unset($post->post_date_gmt);
        unset($post->comment_status);
        unset($post->ping_status);
        unset($post->post_password);
        unset($post->post_name);
        unset($post->to_ping);
        unset($post->pinged);
        unset($post->post_modified);
        unset($post->post_modified_gmt);
        unset($post->post_content_filtered);
        unset($post->post_parent);
        unset($post->guid);
        unset($post->menu_order);
        unset($post->post_mime_type);
        unset($post->comment_count);
        unset($post->filter);
        $posts_data[] = $post;
    }

    $posts_data['wordpress_id'] = 1;

    return $posts_data;
}

add_action('rest_api_init', function() {
    register_rest_route('wp/v2', '/searchResults', [
        'methods' => 'GET',
        'callback' => 'getSearchDataCallback',
    ]);
});
