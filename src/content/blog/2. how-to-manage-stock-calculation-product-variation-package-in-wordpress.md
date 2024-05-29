---
title: Manage stock calculation product variation package in WP
type: blog
keywords:
  - woocommerce
  - wordpress
  - stock calculation
categories:
  - Wordpress Tips
tags:
  - woocommerce
  - wordpress
  - stock calculation
pubDate: 2024-05-29T08:38:27.490Z
description: Managing stock for product variations in WordPress, particularly when dealing with bundled products, can be a bit tricky.
---

Managing stock for product variations in WordPress, particularly when dealing with bundled products, can be a bit tricky. However, with the right approach and tools, you can efficiently track and reduce the stock of individual items included in a package. This guide will walk you through the process of setting up a product variable as a bundle product in WooCommerce, ensuring that stock levels are accurately maintained.

## The cases

there is product (Supplement) and the supplement has package inside, the package is A, B, and C

- A: contains 12 supplements
- B: contains 6 supplements
- C: contains 1 supplements
  if user buy one package A, The stock of supplements must be reduced by 12 instead of 1, because in the package there are 12 supplements
  but in their order or invoice they only show 1 package A,
  **So, all we have to do is reduce product stock for the number of products in the package**

## Steps

First, I will add a field in the product variation to indicate how many products the variation (package) contains. here I named the field `weight`

```php
<?php


/**
 * filename: class-product-variation-field.php
 * Used for Default Component of Pagination
 *
 * Author: Dicky Saputra
 * Author Url : https://dicky54putra.github.io/
 *
 */

defined('ABSPATH') || die("Can't access directly");

class SingleProductVariationField
{
    public function __construct()
    {
        add_action('woocommerce_product_after_variable_attributes', [$this, 'variation_settings_fields'], 10, 3);
        add_action('woocommerce_save_product_variation', [$this, 'save_variation_settings_fields'], 10, 2);
    }

    public function variation_settings_fields($loop, $variation_data, $variation)
    {
        woocommerce_wp_text_input(
            array(
                'id'          => '_mi_weight[' . $variation->ID . ']',
                'label'       => __('Weight', 'woocommerce'),
                'placeholder' => '2',
                'value'       => get_post_meta($variation->ID, '_mi_weight', true) ?? 1
            )
        );
    }

    public function save_variation_settings_fields($post_id)
    {
        $mi_weight = isset($_POST['_mi_weight'][$post_id]) ? sanitize_text_field($_POST['_mi_weight'][$post_id]) : null;
        if (!empty($mi_weight)) {
            update_post_meta($post_id, '_mi_weight', esc_attr($mi_weight));
        }
    }
}

new SingleProductVariationField();

```

in wp-admin a field like this will appear
![Field weight](/public/images/blog-2-screenshot-weight.jpg)

after that, I will execute stock reduction in the hook`woocommerce_order_item_quantity`

```php
<?php

/**
 * filename: class-overide-hook.php
 * Used for Default Component of Pagination
 *
 * Author: Dicky Saputra
 * Author Url : https://dicky54putra.github.io/
 *
 */

defined('ABSPATH') || die("Can't access directly");

class OverideHookProductVariation
{
    public function __construct()
    {
        add_filter('woocommerce_order_item_quantity', [$this, 'handle_qty'], 10, 3);
    }

    public function handle_qty($qty, $order, $item)
    {
        $product = $item->get_product();
        $weight = get_post_meta($product->get_id(), '_mi_weight', true) ?? 1;

        $real_qty = $qty;
        try {
            $real_qty = $qty * $weight;
        } catch (\Throwable $th) {
            //throw $th;
        }

        return $real_qty;
    }
}

new OverideHookProductVariation();
```

don't forget to call these 2 functions in `function.php`

```php
<?php

/**
 * filename: functions.php
 * Used for Default Component of Pagination
 *
 * Author: Dicky Saputra
 * Author Url : https://dicky54putra.github.io/
 *
 */

defined('ABSPATH') || die("Can't access directly");
require_once __DIR__ . '/class-product-variation-field.php';
require_once __DIR__ . '/class-overide-hook.php';
```

## Conclusion

By following these steps and using the appropriate WooCommerce extensions, you can efficiently manage stock for product variation packages in WordPress. This setup ensures that your inventory remains accurate, even when selling bundled products.

For further customization and advanced features, consider exploring additional WooCommerce plugins and extensions that cater to your specific eCommerce needs
