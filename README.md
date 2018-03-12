## Truncate string containing HTML tags

It's given a sample string.

```
s = "<p class="paragraph">Turnip greens yarrow ricebean rutabaga endive cauliflower sea  lettuce kohlrabi amaranth water <a href="https://www.google.pl/search?q=spinach" class="link">spinach</a> avocado daikon Süßkartoffel napa cabbage <strong>asparagus winter purslane kale. Celery potato scallion desert</strong> raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize <span style="font-size: 19px;color: blue;">bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea.</span> Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>"
```

The string is UTF-8 encoded.

Develop a function to truncate the string and add ellipsis to its end.
The truncated string shall not to exceed n characters including ellipsis under the following conditions:
- do not break a word apart;
- do not break a html element apart;
- all open tags must be closed in an appropriate order.
