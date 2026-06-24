/* =============================================================================
   MARENKA — menu content (single source of truth)
   Every item carries { tr, en }. Edit text/prices here; the page re-renders.
   Shape:
     sections[] : { id, navLabel{tr,en}, label{tr,en}, banner?, note?, groups[] }
     groups[]   : { label{tr,en}, note?{tr,en}, items[] }
     items[]    : { name{tr,en}, desc?{tr,en}, allergens?{tr,en},
                    price? (string) | prices?[{label{tr,en}, value}] }
   Generated from the client spreadsheets — see scripts/build_menu_data.py.
   ========================================================================== */
window.MENU_DATA = {
  "sections": [
    {
      "id": "kahvalti",
      "navLabel": {
        "tr": "Kahvaltı",
        "en": "Breakfast"
      },
      "label": {
        "tr": "Kahvaltı",
        "en": "Breakfast"
      },
      "groups": [
        {
          "label": {
            "tr": "Kahvaltılar",
            "en": "Breakfasts"
          },
          "items": [
            {
              "name": {
                "tr": "Ev Kahvaltısı",
                "en": "Home Breakfast"
              },
              "desc": {
                "tr": "Sahanda yumurta, taze doğranmış sebzeler ve yeşillikler, yeşil zeytin, siyah zeytin, bal, kaymak, tereyağı, beyaz peynir, sigara böreği.",
                "en": "Fried eggs, freshly chopped vegetables and greens, green olives, black olives, honey, clotted cream, butter, white cheese, cheese rolls."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Marenka Akdeniz Kahvaltısı",
                "en": "Marenka Mediterranean Breakfast"
              },
              "desc": {
                "tr": "Poşe yumurta, tam buğday ekmeği, avokado, lor peynirli salata, acuka, hellim, yeşil zeytin, siyah zeytin, vişne reçeli, bal, tereyağı.",
                "en": "Poached egg, whole wheat bread, avocado, curd cheese salad, acuka, halloumi, green olives, black olives, cherry jam, honey, butter."
              },
              "price": "800",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Acı",
                "en": "Gluten, Egg, Milk and Dairy Products, Tree Nuts, Spicy"
              }
            },
            {
              "name": {
                "tr": "Sıcak Kahvaltı",
                "en": "Hot Breakfast"
              },
              "desc": {
                "tr": "Dana sosis, çırpılmış yumurta, ızgara sucuk, ızgara hellim, sote mantar, vişne reçeli, kaymak, pişi.",
                "en": "Beef sausage, scrambled eggs, grilled sucuk, grilled halloumi, sautéed mushrooms, cherry jam, clotted cream, pişi."
              },
              "price": "950",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Soya",
                "en": "Gluten, Egg, Milk and Dairy Products, Soy"
              }
            },
            {
              "name": {
                "tr": "Marenka Amerikan Kahvaltısı",
                "en": "Marenka American Breakfast"
              },
              "desc": {
                "tr": "Dana sosis, füme dana eti, sahanda yumurta, hash brown, sote mantar,mozzarella sticks.",
                "en": "Beef sausage, smoked beef, fried eggs, hash browns, sautéed mushrooms, mozzarella sticks."
              },
              "price": "975",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Soya, Gluten",
                "en": "Egg, Milk and Dairy Products, Soy, Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Omletler",
            "en": "Omelettes"
          },
          "items": [
            {
              "name": {
                "tr": "Sade Omlet",
                "en": "Plain Omelette"
              },
              "desc": {
                "tr": "Taze doğranmış sebze tabağı ve zeytin ile servis edilir.",
                "en": "Served with a freshly chopped vegetable platter and olives."
              },
              "price": "350",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Sebzeli Beyaz Omlet",
                "en": "Vegetable Egg White Omelette"
              },
              "desc": {
                "tr": "Yumurta beyazı omlet. Taze doğranmış sebze tabağı ve zeytin ile servis edilir.",
                "en": "Egg white omelette. Served with a freshly chopped vegetable platter and olives."
              },
              "price": "375",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "İspanyol Omleti",
                "en": "Spanish Omelette"
              },
              "desc": {
                "tr": "Patates ve soğanlı omlet.Taze doğranmış sebze tabağı ve zeytin ile servis edilir.",
                "en": "Omelette with potato and onion. Served with a freshly chopped vegetable platter and olives."
              },
              "price": "375",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Peynirli Omlet",
                "en": "Cheese Omelette"
              },
              "desc": {
                "tr": "Taze doğranmış sebze tabağı ve zeytin ile servis edilir.",
                "en": "Served with a freshly chopped vegetable platter and olives."
              },
              "price": "390",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Karışık Omlet",
                "en": "Mixed Omelette"
              },
              "desc": {
                "tr": "Sucuk,sosis, peynir.Taze doğranmış sebze tabağı ve zeytin ile servis edilir.",
                "en": "Sucuk, sausage, cheese. Served with a freshly chopped vegetable platter and olives."
              },
              "price": "450",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Soya",
                "en": "Egg, Milk and Dairy Products, Soy"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Menemen",
            "en": "Menemen"
          },
          "items": [
            {
              "name": {
                "tr": "Sade Menemen",
                "en": "Plain Menemen"
              },
              "desc": {
                "tr": "Yumurta, tereyağı, biber, domates.",
                "en": "Egg, butter, pepper, tomato."
              },
              "price": "375",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Peynirli Menemen",
                "en": "Cheese Menemen"
              },
              "desc": {
                "tr": "Yumurta, tereyağı, biber, domates, kaşar peynir.",
                "en": "Egg, butter, pepper, tomato, kashar cheese."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Sucuklu Menemen",
                "en": "Menemen with Sucuk"
              },
              "desc": {
                "tr": "Yumurta, tereyağı, biber, domates, sucuk.",
                "en": "Egg, butter, pepper, tomato, sucuk."
              },
              "price": "450",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Yumurtalar",
            "en": "Eggs"
          },
          "items": [
            {
              "name": {
                "tr": "Tavada Yumurta",
                "en": "Fried Eggs"
              },
              "desc": {
                "tr": "Yumurta, tereyağı.",
                "en": "Egg, butter."
              },
              "price": "250",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Poşe Yumurta",
                "en": "Poached Egg"
              },
              "desc": {
                "tr": "Haşlanmış yumurta.",
                "en": "Boiled egg."
              },
              "price": "250",
              "allergens": {
                "tr": "Yumurta",
                "en": "Egg"
              }
            },
            {
              "name": {
                "tr": "Çırpılmış Yumurta",
                "en": "Scrambled Eggs"
              },
              "desc": {
                "tr": "Yumurta, tereyağı, süt.",
                "en": "Egg, butter, milk."
              },
              "price": "275",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Patatesli & Soğanlı Yumurta",
                "en": "Eggs with Potato & Onion"
              },
              "desc": {
                "tr": "Yumurta, tereyağı,patates, soğan.",
                "en": "Egg, butter, potato, onion."
              },
              "price": "350",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Sucuklu Yumurta",
                "en": "Eggs with Sucuk"
              },
              "desc": {
                "tr": "Yumurta, tereyağı, sucuk",
                "en": "Egg, butter, sucuk."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Soya",
                "en": "Egg, Milk and Dairy Products, Soy"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Tostlar",
            "en": "Toasties"
          },
          "items": [
            {
              "name": {
                "tr": "Üç Peynirli Tost",
                "en": "Three-Cheese Toastie"
              },
              "desc": {
                "tr": "Patates kızartması ve turşu ile servis edilir.",
                "en": "Served with french fries and pickles."
              },
              "price": "400",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri",
                "en": "Gluten, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Karışık Tost",
                "en": "Mixed Toastie"
              },
              "desc": {
                "tr": "Patates kızartması ve turşu ile servis edilir.",
                "en": "Served with french fries and pickles."
              },
              "price": "450",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya",
                "en": "Gluten, Milk and Dairy Products, Soy"
              }
            },
            {
              "name": {
                "tr": "Bazlama Tost",
                "en": "Bazlama Toastie"
              },
              "desc": {
                "tr": "Füme dana eti, sucuk, peynir, bazlama ekmeği. Patates kızartması ve turşu ile servis edilir.",
                "en": "Smoked beef, sucuk, cheese, bazlama bread. Served with french fries and pickles."
              },
              "price": "500",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Hardal",
                "en": "Gluten, Milk and Dairy Products, Soy, Mustard"
              }
            },
            {
              "name": {
                "tr": "Füme Dana Etli Kruvasan Sandviç",
                "en": "Smoked Beef Croissant Sandwich"
              },
              "desc": {
                "tr": "Pesto, peynir, Akdeniz yeşillikleri. Patates kızartması ve turşu ile servis edilir.",
                "en": "Pesto, cheese, Mediterranean greens. Served with french fries and pickles."
              },
              "price": "600",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Hardal",
                "en": "Gluten, Egg, Milk and Dairy Products, Tree Nuts, Mustard"
              }
            },
            {
              "name": {
                "tr": "Çırpılmış Yumurtalı & Hellimli Tost",
                "en": "Scrambled Eggs & Halloumi Toastie"
              },
              "desc": {
                "tr": "Tam buğday ekmeği, avokado, ayçiçeği içi. Patates kızartması ve turşu ile servis edilir.",
                "en": "Whole wheat bread, avocado, sunflower seeds. Served with french fries and pickles."
              },
              "price": "600",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler",
                "en": "Gluten, Egg, Milk and Dairy Products, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Füme Somonlu & Poşe Yumurtalı Kruvasan Sandviç",
                "en": "Smoked Salmon & Poached Egg Croissant Sandwich"
              },
              "desc": {
                "tr": "Avokado, Akdeniz yeşillikleri, krem peynir. Patates kızartması ve turşu ile servis edilir.",
                "en": "Avocado, Mediterranean greens, cream cheese. Served with french fries and pickles."
              },
              "price": "650",
              "allergens": {
                "tr": "Gluten, Yumurta, Balık, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Fish, Milk and Dairy Products"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Yan Ürünler",
            "en": "Sides"
          },
          "items": [
            {
              "name": {
                "tr": "Reçeller",
                "en": "Jams"
              },
              "desc": {
                "tr": "Vişne, çilek, şeker.",
                "en": "Cherry, strawberry, sugar."
              },
              "price": "100",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "Pişi",
                "en": "Pişi"
              },
              "desc": {
                "tr": "Un,yağ,süt,maya,yumurta,su.",
                "en": "Flour, oil, milk, yeast, egg, water."
              },
              "price": "125",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Bal & Kaymak",
                "en": "Honey & Clotted Cream"
              },
              "desc": {
                "tr": "Bal, kaymak.",
                "en": "Honey, clotted cream."
              },
              "price": "250",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri",
                "en": "Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Söğüş Tabak",
                "en": "Fresh Vegetable Platter"
              },
              "desc": {
                "tr": "Domates, salatalık, biber, roka, maydanoz.",
                "en": "Tomato, cucumber, pepper, arugula, parsley."
              },
              "price": "250",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "Kalem Börek",
                "en": "Cheese Rolls"
              },
              "desc": {
                "tr": "Yufka, peynir, maydanoz,yumurta,sıvı yağ.",
                "en": "Filo pastry, cheese, parsley, egg, vegetable oil."
              },
              "price": "250",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Zeytin",
                "en": "Olives"
              },
              "desc": {
                "tr": "Siyah zeytin, yeşil zeytin.",
                "en": "Black olives, green olives."
              },
              "price": "250",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "Kruvasan",
                "en": "Croissant"
              },
              "desc": {
                "tr": "Un, tereyağı,maya,yumurta.",
                "en": "Flour, butter, yeast, egg."
              },
              "price": "250",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Nutella",
                "en": "Nutella"
              },
              "desc": {
                "tr": "Fındık,kakao,süt,soya",
                "en": "Hazelnut, cocoa, milk, soy."
              },
              "price": "250",
              "allergens": {
                "tr": "Soya, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler",
                "en": "Soy, Milk and Dairy Products, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Tavada Sucuk",
                "en": "Pan-Fried Sucuk"
              },
              "desc": {
                "tr": "Tereyağı, sucuk",
                "en": "Butter, sucuk."
              },
              "price": "300",
              "allergens": {
                "tr": "Soya, Süt ve Süt Ürünleri",
                "en": "Soy, Milk and Dairy Products"
              }
            }
          ]
        }
      ],
      "banner": {
        "eyebrow": {
          "tr": "Mutfaktan",
          "en": "From the Kitchen"
        },
        "title": {
          "tr": "Yemekler",
          "en": "Food"
        }
      }
    },
    {
      "id": "ogle",
      "navLabel": {
        "tr": "Öğle",
        "en": "Lunch"
      },
      "label": {
        "tr": "Öğle Menüsü",
        "en": "Lunch"
      },
      "groups": [
        {
          "label": {
            "tr": "Burgerler",
            "en": "Burgers"
          },
          "items": [
            {
              "name": {
                "tr": "Çıtır Tavuk Burger",
                "en": "Crispy Chicken Burger"
              },
              "desc": {
                "tr": "Pane Tavuk,Coleslaw salata, cheddar, tereyağı. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Breaded chicken, coleslaw, cheddar, butter. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "500",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Hardal, Susam",
                "en": "Gluten, Egg, Milk and Dairy Products, Mustard, Sesame"
              }
            },
            {
              "name": {
                "tr": "Classic Burger",
                "en": "Classic Burger"
              },
              "desc": {
                "tr": "Domates, marul, turşu, kırmızı şarap, karamelize soğan, patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Tomato, lettuce, pickles, red wine, caramelized onion, served with french fries and mayonnaise dipping sauce."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Yumurta, Hardal, Susam, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Mustard, Sesame, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Cheeseburger",
                "en": "Cheeseburger"
              },
              "desc": {
                "tr": "Domates, cheddar, marul, turşu, karamelize soğan, kırmızı şarap, patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Tomato, cheddar, lettuce, pickles, caramelized onion, red wine, served with french fries and mayonnaise dipping sauce."
              },
              "price": "600",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Hardal, Susam",
                "en": "Gluten, Egg, Milk and Dairy Products, Mustard, Sesame"
              }
            },
            {
              "name": {
                "tr": "Marenka Burger",
                "en": "Marenka Burger"
              },
              "desc": {
                "tr": "Karamelize soğan, blue cheese sos, füme dana eti, sos, kırmızı şarap, patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Caramelized onion, blue cheese sauce, smoked beef, sauce, red wine, served with french fries and mayonnaise dipping sauce."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Hardal, Susam",
                "en": "Gluten, Egg, Milk and Dairy Products, Mustard, Sesame"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Baget Sandviçler",
            "en": "Baguette Sandwiches"
          },
          "items": [
            {
              "name": {
                "tr": "Ton Balıklı Baget",
                "en": "Tuna Baguette"
              },
              "desc": {
                "tr": "Ranch sos, roka, domates, soğan, mısır. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Ranch sauce, arugula, tomato, onion, corn. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "500",
              "allergens": {
                "tr": "Gluten, Yumurta, Balık, Hardal, Susam, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Fish, Mustard, Sesame, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Körili Tavuk Baget",
                "en": "Curried Chicken Baguette"
              },
              "desc": {
                "tr": "Sote mantar ve soğan, yeşil biber, cheddar peyniri. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Sautéed mushrooms and onion, green pepper, cheddar cheese. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Hardal, Susam",
                "en": "Gluten, Egg, Milk and Dairy Products, Mustard, Sesame"
              }
            },
            {
              "name": {
                "tr": "Steak Mexican Baget",
                "en": "Steak Mexican Baguette"
              },
              "desc": {
                "tr": "Sote mantar ve soğan, yeşil biber, salsa sos. Patates kızartması ve mayonez dip sos ile servis edilir. Acılı.",
                "en": "Sautéed mushrooms and onion, green pepper, salsa sauce. Served with french fries and mayonnaise dipping sauce. Spicy."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Hardal, Susam, Süt ve Süt Ürünleri, Acı",
                "en": "Gluten, Egg, Mustard, Sesame, Milk and Dairy Products, Spicy"
              }
            },
            {
              "name": {
                "tr": "Füme Somonlu Baget",
                "en": "Smoked Salmon Baguette"
              },
              "desc": {
                "tr": "Avokado, krem peynir, karışık yeşillikler. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Avocado, cream cheese, mixed greens. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Balık, Süt ve Süt Ürünleri, Hardal, Susam",
                "en": "Gluten, Egg, Fish, Milk and Dairy Products, Mustard, Sesame"
              }
            },
            {
              "name": {
                "tr": "Philly Cheese Steak Baget",
                "en": "Philly Cheese Steak Baguette"
              },
              "desc": {
                "tr": "Sote mantar ve soğan, yeşil biber, mozzarella peyniri. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Sautéed mushrooms and onion, green pepper, mozzarella cheese. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Hardal, Susam, Soya",
                "en": "Gluten, Egg, Milk and Dairy Products, Mustard, Sesame, Soy"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Dürümler",
            "en": "Wraps"
          },
          "items": [
            {
              "name": {
                "tr": "Sebzeli Dürüm",
                "en": "Vegetable Wrap"
              },
              "desc": {
                "tr": "Karışık sebzeler. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Mixed vegetables. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "400",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Tavuk Dürüm",
                "en": "Chicken Wrap"
              },
              "desc": {
                "tr": "Tavuk, Kapya biber, yeşil biber, mozzarella peyniri. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Chicken, kapia pepper, green pepper, mozzarella cheese. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "500",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Dana Dürüm",
                "en": "Beef Wrap"
              },
              "desc": {
                "tr": "Dana, Kapya biber, yeşil biber, mozzarella peyniri. Patates kızartması ve mayonez dip sos ile servis edilir.",
                "en": "Beef, kapia pepper, green pepper, mozzarella cheese. Served with french fries and mayonnaise dipping sauce."
              },
              "price": "650",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Soya",
                "en": "Gluten, Egg, Milk and Dairy Products, Soy"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Pizzalar",
            "en": "Pizzas"
          },
          "items": [
            {
              "name": {
                "tr": "Margherita Pizza",
                "en": "Margherita Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri.",
                "en": "Tomato sauce, mozzarella cheese."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Peynirli Calzone Sandviç",
                "en": "Cheese Calzone Sandwich"
              },
              "desc": {
                "tr": "Hellim peyniri, karışık yeşillikler, pesto sos, parmesan.",
                "en": "Halloumi, mixed greens, pesto sauce, parmesan."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Tree Nuts, Egg"
              }
            },
            {
              "name": {
                "tr": "Hindili Calzone Sandviç",
                "en": "Turkey Calzone Sandwich"
              },
              "desc": {
                "tr": "Hindi, Soğan, Akdeniz yeşillikleri, parmesan.",
                "en": "Turkey, onion, Mediterranean greens, parmesan."
              },
              "price": "575",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta, Hardal",
                "en": "Gluten, Milk and Dairy Products, Egg, Mustard"
              }
            },
            {
              "name": {
                "tr": "Ton Balıklı Pizza",
                "en": "Tuna Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri, kırmızı soğan, mısır.",
                "en": "Tomato sauce, mozzarella cheese, red onion, corn."
              },
              "price": "600",
              "allergens": {
                "tr": "Gluten, Balık, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Fish, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Karışık Pizza",
                "en": "Mixed Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri, sucuk, dana sosis, mantar, taze biber, mısır.",
                "en": "Tomato sauce, mozzarella cheese, sucuk, beef sausage, mushroom, fresh pepper, corn."
              },
              "price": "650",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Soy, Egg"
              }
            },
            {
              "name": {
                "tr": "Alaturca Pizza",
                "en": "Alaturca Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri, füme dana eti, Türk sucuğu, zeytin, biber.",
                "en": "Tomato sauce, mozzarella cheese, smoked beef, Turkish sucuk, olives, pepper."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Yumurta, Hardal",
                "en": "Gluten, Milk and Dairy Products, Soy, Egg, Mustard"
              }
            },
            {
              "name": {
                "tr": "Quattro Formaggi",
                "en": "Quattro Formaggi"
              },
              "desc": {
                "tr": "Crème fraîche sos, parmesan, mozzarella peyniri, Kars gravyeri, gorgonzola peyniri.",
                "en": "Crème fraîche sauce, parmesan, mozzarella cheese, Kars gruyère, gorgonzola cheese."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Etli & Füme Calzone Sandviç",
                "en": "Meat & Smoked Beef Calzone Sandwich"
              },
              "desc": {
                "tr": "Füme dana eti, soğan, roka, parmesan.",
                "en": "Smoked beef, onion, arugula, parmesan."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta, Hardal",
                "en": "Gluten, Milk and Dairy Products, Egg, Mustard"
              }
            },
            {
              "name": {
                "tr": "Marenka Buffalo Pizza",
                "en": "Marenka Buffalo Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri, dana bonfile, roka, parmesan, karamelize soğan, jalapeño biberi.",
                "en": "Tomato sauce, mozzarella cheese, beef tenderloin, arugula, parmesan, caramelized onion, jalapeño pepper."
              },
              "price": "875",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta, Acı",
                "en": "Gluten, Milk and Dairy Products, Egg, Spicy"
              }
            },
            {
              "name": {
                "tr": "Marenka Deniz Ürünleri Pizza",
                "en": "Marenka Seafood Pizza"
              },
              "desc": {
                "tr": "Pesto sos, mozzarella peyniri, karides, kalamar, somon, ahtapot, roka, parmesan peyniri.",
                "en": "Pesto sauce, mozzarella cheese, shrimp, calamari, salmon, octopus, arugula, parmesan cheese."
              },
              "price": "950",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta, Kabuklular, Yumuşakçalar, Balık",
                "en": "Gluten, Milk and Dairy Products, Egg, Crustaceans, Molluscs, Fish"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Makarnalar",
            "en": "Pasta"
          },
          "items": [
            {
              "name": {
                "tr": "Penne Arrabbiata",
                "en": "Penne Arrabbiata"
              },
              "desc": {
                "tr": "Zeytin, zeytinyağı, hafif acılı domates sos.",
                "en": "Olives, olive oil, mildly spicy tomato sauce."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Acı",
                "en": "Gluten, Milk and Dairy Products, Spicy"
              }
            },
            {
              "name": {
                "tr": "Spaghetti Bolognese",
                "en": "Spaghetti Bolognese"
              },
              "desc": {
                "tr": "Dana kıyma, soğan, karabiber, havuç, kereviz, domates sos.",
                "en": "Ground beef, onion, black pepper, carrot, celery, tomato sauce."
              },
              "price": "600",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Kereviz",
                "en": "Gluten, Milk and Dairy Products, Soy, Celery"
              }
            },
            {
              "name": {
                "tr": "Pesto soslu Tavuk Fettuccine",
                "en": "Chicken Fettuccine with Pesto Sauce"
              },
              "desc": {
                "tr": "Tavuk, Sarımsak, krema, mantar.",
                "en": "Chicken, garlic, cream, mushroom."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler",
                "en": "Gluten, Egg, Milk and Dairy Products, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Ragù Fettuccine",
                "en": "Ragù Fettuccine"
              },
              "desc": {
                "tr": "Dana bonfile, pembe sos, kırmızı şarap, kapya biber az acı",
                "en": "Beef tenderloin, pink sauce, red wine, kapia pepper, mildly spicy."
              },
              "price": "875",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kereviz, Acı",
                "en": "Gluten, Egg, Milk and Dairy Products, Celery, Spicy"
              }
            },
            {
              "name": {
                "tr": "Somon Fettuccine",
                "en": "Salmon Fettuccine"
              },
              "desc": {
                "tr": "Şaraplı krema sos, karışık biberler, kapari.",
                "en": "Wine cream sauce, mixed peppers, capers."
              },
              "price": "900",
              "allergens": {
                "tr": "Gluten, Yumurta, Balık, Süt ve Süt Ürünleri, Sülfit",
                "en": "Gluten, Egg, Fish, Milk and Dairy Products, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Deniz Ürünlü Spaghetti",
                "en": "Seafood Spaghetti"
              },
              "desc": {
                "tr": "Karışık deniz ürünleri, beyaz şarap.",
                "en": "Mixed seafood, white wine."
              },
              "price": "950",
              "allergens": {
                "tr": "Gluten, Kabuklular, Balık, Süt ve Süt Ürünleri, Sülfit, Yumuşakçalar",
                "en": "Gluten, Crustaceans, Fish, Milk and Dairy Products, Sulphites, Molluscs"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Noodle'lar",
            "en": "Noodles"
          },
          "items": [
            {
              "name": {
                "tr": "Sebzeli Noodle",
                "en": "Vegetable Noodle"
              },
              "desc": {
                "tr": "Karışık sebzeler, soya sosu.",
                "en": "Mixed vegetables, soy sauce."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Yumurta, Soya, Susam",
                "en": "Gluten, Egg, Soy, Sesame"
              }
            },
            {
              "name": {
                "tr": "Tavuk Noodle",
                "en": "Chicken Noodle"
              },
              "desc": {
                "tr": "Tavuk,havuç,kabak,lahana,kapya biberler,zencefil,soya sos,susam,yağ,noodle,pırasa.",
                "en": "Chicken, carrot, zucchini, cabbage, kapia peppers, ginger, soy sauce, sesame, oil, noodles, leek."
              },
              "price": "600",
              "allergens": {
                "tr": "Gluten, Yumurta, Soya, Susam",
                "en": "Gluten, Egg, Soy, Sesame"
              }
            },
            {
              "name": {
                "tr": "Dana Noodle",
                "en": "Beef Noodle"
              },
              "desc": {
                "tr": "Dana eti,havuç,kabak,lahana,kapya biberler,zencefil,soya sos,susam,yağ,noodle,pırasa.",
                "en": "Beef, carrot, zucchini, cabbage, kapia peppers, ginger, soy sauce, sesame, oil, noodles, leek."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Yumurta, Soya, Susam",
                "en": "Gluten, Egg, Soy, Sesame"
              }
            },
            {
              "name": {
                "tr": "Singapore Noodle",
                "en": "Singapore Noodle"
              },
              "desc": {
                "tr": "Karides, tavuk, sebzeler, safran sos.",
                "en": "Shrimp, chicken, vegetables, saffron sauce."
              },
              "price": "950",
              "allergens": {
                "tr": "Gluten, Kabuklular, Yumurta, Soya, Süt ve Süt Ürünleri, Susam",
                "en": "Gluten, Crustaceans, Egg, Soy, Milk and Dairy Products, Sesame"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Salatalar & Bowl'lar",
            "en": "Salads & Bowls"
          },
          "items": [
            {
              "name": {
                "tr": "Roka Salatası",
                "en": "Arugula Salad"
              },
              "desc": {
                "tr": "Çeri domates, balsamik sos, kırmızı soğan, kuru kayısı, tulum peyniri, ceviz",
                "en": "Cherry tomato, balsamic sauce, red onion, dried apricot, tulum cheese, walnuts."
              },
              "price": "450",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Sülfit, Kabuklu Kuruyemişler",
                "en": "Milk and Dairy Products, Sulphites, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Zeytinyağlı Mevsim Salatası",
                "en": "Seasonal Salad with Olive Oil"
              },
              "desc": {
                "tr": "Mevsim yeşillikleri, çeri domates, salatalık, lahana, zeytinyağı ve limon sos.",
                "en": "Mixed greens, cherry tomato, cucumber, cabbage, olive oil and lemon dressing."
              },
              "price": "450",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Pancar Salatası",
                "en": "Beetroot Salad"
              },
              "desc": {
                "tr": "Roka, soğan, taze ekşi sos, yeşil elma, havuç, ceviz.",
                "en": "Arugula, onion, fresh sour sauce, green apple, carrot, walnuts."
              },
              "price": "450",
              "allergens": {
                "tr": "Kabuklu Kuruyemişler, Sülfit",
                "en": "Tree Nuts, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Yunan Salatası",
                "en": "Greek Salad"
              },
              "desc": {
                "tr": "Domates, soğan, zeytin, salatalık, beyaz peynir, kekik, kapya biber, zeytinyağı ve limon sos.",
                "en": "Tomato, onion, olives, cucumber, white cheese, oregano, kapia pepper, olive oil and lemon dressing."
              },
              "price": "500",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Sülfit",
                "en": "Milk and Dairy Products, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Yaz Salatası",
                "en": "Summer Salad"
              },
              "desc": {
                "tr": "Semizotu, kinoa, kuru kayısı, yeşil elma, kuru üzüm, ay çekirdeği, orange sos, zeytinyağı.",
                "en": "Purslane, quinoa, dried apricot, green apple, raisins, sunflower seeds, orange dressing, olive oil."
              },
              "price": "500",
              "allergens": {
                "tr": "Kabuklu Kuruyemişler, Sülfit, Hardal",
                "en": "Tree Nuts, Sulphites, Mustard"
              }
            },
            {
              "name": {
                "tr": "Tavuklu Sezar Salata",
                "en": "Chicken Caesar Salad"
              },
              "desc": {
                "tr": "Sezar sos, iceberg marul, kruton.",
                "en": "Caesar dressing, iceberg lettuce, croutons."
              },
              "price": "600",
              "allergens": {
                "tr": "Gluten, Yumurta, Balık, Süt ve Süt Ürünleri, Hardal",
                "en": "Gluten, Egg, Fish, Milk and Dairy Products, Mustard"
              }
            },
            {
              "name": {
                "tr": "Ton Balıklı Salata",
                "en": "Tuna Salad"
              },
              "desc": {
                "tr": "Kırmızı soğan, Akdeniz yeşillikleri, domates, salatalık, mısır, nohut, yeşil zeytin.",
                "en": "Red onion, Mediterranean greens, tomato, cucumber, corn, chickpeas, green olives."
              },
              "price": "600",
              "allergens": {
                "tr": "Balık, Yumurta",
                "en": "Fish, Egg"
              }
            },
            {
              "name": {
                "tr": "Sebzeli Bowl",
                "en": "Vegetable Bowl"
              },
              "desc": {
                "tr": "Sote ıspanak, avokado, pancar, California biberi, kinoa, havuç, soya fasulyesi, nohut, mısır.",
                "en": "Sautéed spinach, avocado, beetroot, California pepper, quinoa, carrot, soybeans, chickpeas, corn."
              },
              "price": "650",
              "allergens": {
                "tr": "Soya",
                "en": "Soy"
              }
            },
            {
              "name": {
                "tr": "Tavuk Bowl",
                "en": "Chicken Bowl"
              },
              "desc": {
                "tr": "Tavuk, Sote sebzeler, avokado, pancar, kuskus, soya fasulyesi, nohut, mısır.",
                "en": "Chicken, sautéed vegetables, avocado, beetroot, couscous, soybeans, chickpeas, corn."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Soya",
                "en": "Gluten, Soy"
              }
            },
            {
              "name": {
                "tr": "Kalamar Tava Salata",
                "en": "Pan-Fried Calamari Salad"
              },
              "desc": {
                "tr": "Kalamar, Mevsim yeşillikleri, bira, domates, salatalık, soğan, beyaz peynir, zeytinyağı ve limon sos.",
                "en": "Calamari, mixed greens, beer, tomato, cucumber, onion, white cheese, olive oil and lemon dressing."
              },
              "price": "750",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Yumuşakçalar, Gluten",
                "en": "Milk and Dairy Products, Molluscs, Gluten"
              }
            },
            {
              "name": {
                "tr": "Köfte Bowl",
                "en": "Köfte Bowl"
              },
              "desc": {
                "tr": "Dana Kıyma, Sote ıspanak, avokado, pancar, biber, kinoa, havuç, kuskus, soya fasulyesi, nohut.",
                "en": "Ground beef, sautéed spinach, avocado, beetroot, pepper, quinoa, carrot, couscous, soybeans, chickpeas."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Soya",
                "en": "Gluten, Egg, Soy"
              }
            },
            {
              "name": {
                "tr": "Deniz Ürünlü Salata",
                "en": "Seafood Salad"
              },
              "desc": {
                "tr": "Deniz Ürünleri, Akdeniz yeşillikleri, domates, salatalık, kırmızı soğan, avokado, zeytinyağı ve limon sos.",
                "en": "Seafood, Mediterranean greens, tomato, cucumber, red onion, avocado, olive oil and lemon dressing."
              },
              "price": "850",
              "allergens": {
                "tr": "Kabuklular, Balık, Yumuşakçalar, Soya",
                "en": "Crustaceans, Fish, Molluscs, Soy"
              }
            },
            {
              "name": {
                "tr": "Dana Bowl",
                "en": "Beef Bowl"
              },
              "desc": {
                "tr": "Dana, Sote ıspanak, sebzeler, pancar, kuskus, soya fasulyesi, nohut, çeri domates.",
                "en": "Beef, sautéed spinach, vegetables, beetroot, couscous, soybeans, chickpeas, cherry tomato."
              },
              "price": "1100",
              "allergens": {
                "tr": "Gluten, Soya",
                "en": "Gluten, Soy"
              }
            },
            {
              "name": {
                "tr": "Izgara Somon Bowl",
                "en": "Grilled Salmon Bowl"
              },
              "desc": {
                "tr": "Somon, Sote ıspanak, avokado, pancar, kinoa, havuç, soya fasulyesi, nohut.",
                "en": "Salmon, sautéed spinach, avocado, beetroot, quinoa, carrot, soybeans, chickpeas."
              },
              "price": "1200",
              "allergens": {
                "tr": "Balık, Soya",
                "en": "Fish, Soy"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Atıştırmalıklar",
            "en": "Small Plates"
          },
          "items": [
            {
              "name": {
                "tr": "Patates Cipsi",
                "en": "Potato Chips"
              },
              "desc": {
                "tr": "Derin yağda kızarmış patates.",
                "en": "Deep-fried potatoes."
              },
              "price": "250",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Parmesan ve Trüflü Patates Kızartması",
                "en": "Parmesan & Truffle French Fries"
              },
              "desc": {
                "tr": "Çıtır patates kızartması, parmesan peyniri, trüf yağı.",
                "en": "Crispy french fries, parmesan cheese, truffle oil."
              },
              "price": "300",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Çin Böreği",
                "en": "Chinese Spring Rolls"
              },
              "desc": {
                "tr": "Havuç, kabak, lahana, soğan, pırasa, soya sosu.",
                "en": "Carrot, zucchini, cabbage, onion, leek, soy sauce."
              },
              "price": "325",
              "allergens": {
                "tr": "Gluten, Soya, Yumurta",
                "en": "Gluten, Soy, Egg"
              }
            },
            {
              "name": {
                "tr": "Izgara Hellim",
                "en": "Grilled Halloumi"
              },
              "desc": {
                "tr": "Izgara kapya biber, pesto, glaze sos.",
                "en": "Grilled kapia pepper, pesto, glaze sauce."
              },
              "price": "375",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Sülfit",
                "en": "Milk and Dairy Products, Tree Nuts, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Tavuk Sepeti",
                "en": "Chicken Basket"
              },
              "desc": {
                "tr": "Tavuk, süt,yumurta,panko unu, yağ, patates cipsi.",
                "en": "Chicken, milk, egg, panko flour, oil, potato chips."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Somon Gravlax",
                "en": "Salmon Gravlax"
              },
              "desc": {
                "tr": "Çıtır ekmek, roka, krem peynir, füme somon, glaze sos.",
                "en": "Crispy bread, arugula, cream cheese, smoked salmon, glaze sauce."
              },
              "price": "650",
              "allergens": {
                "tr": "Gluten, Balık, Süt ve Süt Ürünleri, Sülfit",
                "en": "Gluten, Fish, Milk and Dairy Products, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Marenka Tadım Tabağı",
                "en": "Marenka Tasting Platter"
              },
              "desc": {
                "tr": "Patates kızartması, Çin böreği, sigara böreği, hellim peyniri, tavuk finger, dana sosis, mozzarella stick.",
                "en": "French fries, Chinese spring rolls, cheese rolls, halloumi, chicken fingers, beef sausage, mozzarella sticks."
              },
              "price": "900",
              "allergens": {
                "tr": "Gluten, Yumurta, Soya, Süt ve Süt Ürünleri, Hardal, Susam",
                "en": "Gluten, Egg, Soy, Milk and Dairy Products, Mustard, Sesame"
              }
            },
            {
              "name": {
                "tr": "Kızarmış Kalamar",
                "en": "Fried Calamari"
              },
              "desc": {
                "tr": "Limon, tartar sos.",
                "en": "Lemon, tartar sauce."
              },
              "price": "975",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Hardal, Yumurta, Yumuşakçalar",
                "en": "Gluten, Milk and Dairy Products, Mustard, Egg, Molluscs"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Çocuk Menüsü",
            "en": "Kids' Menu"
          },
          "items": [
            {
              "name": {
                "tr": "Pizza & Patates",
                "en": "Pizza & Fries"
              },
              "desc": {
                "tr": "Mozzarella peyniri, domates sos, patates cipsi.",
                "en": "Mozzarella cheese, tomato sauce, potato chips."
              },
              "price": "400",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Soy, Egg"
              }
            },
            {
              "name": {
                "tr": "Hamburger & Patates",
                "en": "Hamburger & Fries"
              },
              "desc": {
                "tr": "Dana kıyma hamburger, patates cipsi.",
                "en": "Ground beef burger, potato chips."
              },
              "price": "450",
              "allergens": {
                "tr": "Gluten, Yumurta, Hardal, Süt ve Süt Ürünleri, Susam, Soya",
                "en": "Gluten, Egg, Mustard, Milk and Dairy Products, Sesame, Soy"
              }
            },
            {
              "name": {
                "tr": "Bolognese soslu Makarna",
                "en": "Pasta with Bolognese Sauce"
              },
              "desc": {
                "tr": "Dana kıyma, soğan, karabiber, havuç, kereviz, domates sos.",
                "en": "Ground beef, onion, black pepper, carrot, celery, tomato sauce."
              },
              "price": "475",
              "allergens": {
                "tr": "Gluten, Kereviz, Süt ve Süt Ürünleri",
                "en": "Gluten, Celery, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Köfte & Pilav & Patates",
                "en": "Köfte & Rice Pilaf & Fries"
              },
              "desc": {
                "tr": "Dana kıyma, pilav, patates cipsi.",
                "en": "Ground beef, rice pilaf, potato chips."
              },
              "price": "525",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Tatlılar",
            "en": "Desserts"
          },
          "items": [
            {
              "name": {
                "tr": "Karpuz Tabağı",
                "en": "Watermelon Platter"
              },
              "desc": {
                "tr": "Karpuz",
                "en": "Watermelon."
              },
              "price": "300",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "Panna Cotta",
                "en": "Panna Cotta"
              },
              "desc": {
                "tr": "Süt,şeker,krema",
                "en": "Milk, sugar, cream."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Brownie",
                "en": "Brownie"
              },
              "desc": {
                "tr": "Tereyağı, yumurta,şeker,çikolata,un,kakao,kabartma tozu.",
                "en": "Butter, egg, sugar, chocolate, flour, cocoa, baking powder."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten, Kabuklu Kuruyemişler",
                "en": "Egg, Milk and Dairy Products, Gluten, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Tiramisu",
                "en": "Tiramisu"
              },
              "desc": {
                "tr": "Labne,şanti,yumurta,toz jelatin,kahve,kedi dili,kakao,şeker.",
                "en": "Labneh, whipped cream, egg, powdered gelatin, coffee, ladyfingers, cocoa, sugar."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten",
                "en": "Egg, Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Profiterol",
                "en": "Profiterole"
              },
              "desc": {
                "tr": "Yumurta, un,şeker,süt,çikolata, kakao,bitkisel yağ.",
                "en": "Egg, flour, sugar, milk, chocolate, cocoa, vegetable oil."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten",
                "en": "Egg, Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Günün Tatlısı",
                "en": "Dessert of the Day"
              },
              "desc": {
                "tr": "***İçeriğe göre değişir",
                "en": "***Varies by preparation"
              },
              "price": "400",
              "allergens": {
                "tr": "Servis personeline danışınız",
                "en": "Please ask our staff"
              }
            },
            {
              "name": {
                "tr": "Meyve Tabağı",
                "en": "Fruit Platter"
              },
              "desc": {
                "tr": "Mevsim meyveleri.",
                "en": "Seasonal fruits."
              },
              "price": "400",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "San Sebastian Cheesecake",
                "en": "San Sebastian Cheesecake"
              },
              "desc": {
                "tr": "Sos seçimi: vişne sos veya çikolata sos.",
                "en": "Choice of sauce: cherry sauce or chocolate sauce."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "aksam",
      "navLabel": {
        "tr": "Akşam",
        "en": "Dinner"
      },
      "label": {
        "tr": "Akşam Menüsü",
        "en": "Dinner"
      },
      "groups": [
        {
          "label": {
            "tr": "Çorbalar",
            "en": "Soups"
          },
          "items": [
            {
              "name": {
                "tr": "Tavuk Çorbası",
                "en": "Chicken Soup"
              },
              "desc": {
                "tr": "Tavuk suyu, havuç, krema, un.",
                "en": "Chicken stock, carrot, cream, flour."
              },
              "price": "350",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri",
                "en": "Gluten, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Soğan Çorbası",
                "en": "Onion Soup"
              },
              "desc": {
                "tr": "Gruyère peyniri, beyaz şarap, kruton, karamelize soğan.",
                "en": "Gruyère cheese, white wine, croutons, caramelized onion."
              },
              "price": "350",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri",
                "en": "Gluten, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Tom Yum Deniz Ürünleri Çorbası",
                "en": "Tom Yum Seafood Soup"
              },
              "desc": {
                "tr": "Karışık deniz ürünleri. Acılı.",
                "en": "Mixed seafood. Spicy."
              },
              "price": "525",
              "allergens": {
                "tr": "Kabuklular, Balık, Yumuşakçalar, Soya, Gluten, Acı",
                "en": "Crustaceans, Fish, Molluscs, Soy, Gluten, Spicy"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Başlangıçlar",
            "en": "Starters"
          },
          "items": [
            {
              "name": {
                "tr": "Patates Cipsi",
                "en": "Potato Chips"
              },
              "desc": {
                "tr": "Derin yağda kızarmış patates.",
                "en": "Deep-fried potatoes."
              },
              "price": "250",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Parmesan ve Trüflü Patates Kızartması",
                "en": "Parmesan & Truffle French Fries"
              },
              "desc": {
                "tr": "Çıtır patates kızartması, parmesan peyniri, trüf yağı.",
                "en": "Crispy french fries, parmesan cheese, truffle oil."
              },
              "price": "300",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Çin Böreği",
                "en": "Chinese Spring Rolls"
              },
              "desc": {
                "tr": "Havuç, kabak, lahana, soğan, pırasa, soya sosu.",
                "en": "Carrot, zucchini, cabbage, onion, leek, soy sauce."
              },
              "price": "325",
              "allergens": {
                "tr": "Gluten, Soya, Yumurta",
                "en": "Gluten, Soy, Egg"
              }
            },
            {
              "name": {
                "tr": "Peynirli Sarımsaklı Ekmek",
                "en": "Cheesy Garlic Bread"
              },
              "desc": {
                "tr": "Baget ekmek tereyağlı baharatlı sarımsak sos mozerella peyniri.",
                "en": "Baguette, butter, spiced garlic sauce, mozzarella cheese."
              },
              "price": "325",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Izgara Hellim",
                "en": "Grilled Halloumi"
              },
              "desc": {
                "tr": "Izgara kapya biber, pesto, glaze sos.",
                "en": "Grilled kapia pepper, pesto, glaze sauce."
              },
              "price": "375",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Sülfit",
                "en": "Milk and Dairy Products, Tree Nuts, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Buffalo Kanatları",
                "en": "Buffalo Wings"
              },
              "desc": {
                "tr": "Blue cheese sos ve sweet chili sos.Acılı",
                "en": "Blue cheese sauce and sweet chili sauce. Spicy."
              },
              "price": "400",
              "allergens": {
                "tr": "Gluten, Soya, Hardal, Sülfit, Süt ve Süt Ürünleri, Acı",
                "en": "Gluten, Soy, Mustard, Sulphites, Milk and Dairy Products, Spicy"
              }
            },
            {
              "name": {
                "tr": "Türk Meze Tabağı",
                "en": "Turkish Meze Platter"
              },
              "desc": {
                "tr": "Acuka, Pazı kavurma, girit ezme, rus salatası, fava, havuç tarator,pancar.",
                "en": "Acuka, sautéed chard, Cretan herb dip, Russian salad, fava, carrot tarator, beetroot."
              },
              "price": "525",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Susam",
                "en": "Gluten, Milk and Dairy Products, Tree Nuts, Sesame"
              }
            },
            {
              "name": {
                "tr": "Balık Ceviche",
                "en": "Fish Ceviche"
              },
              "desc": {
                "tr": "Hardal tohumu, tane karabiber, narenciye kabuğu, kapari, çeri domates, taze dereotu, zeytinyağı.",
                "en": "Mustard seed, black peppercorns, citrus zest, capers, cherry tomato, fresh dill, olive oil."
              },
              "price": "625",
              "allergens": {
                "tr": "Balık, Hardal",
                "en": "Fish, Mustard"
              }
            },
            {
              "name": {
                "tr": "Susamlı Levrek",
                "en": "Sesame-Crusted Sea Bass"
              },
              "desc": {
                "tr": "Filo hamuru, sweet chili sos.",
                "en": "Filo pastry, sweet chili sauce."
              },
              "price": "625",
              "allergens": {
                "tr": "Gluten, Balık, Susam",
                "en": "Gluten, Fish, Sesame"
              }
            },
            {
              "name": {
                "tr": "Somon Gravlax",
                "en": "Salmon Gravlax"
              },
              "desc": {
                "tr": "Çıtır ekmek, roka, krem peynir, füme somon, glaze sos.",
                "en": "Crispy bread, arugula, cream cheese, smoked salmon, glaze sauce."
              },
              "price": "650",
              "allergens": {
                "tr": "Gluten, Balık, Süt ve Süt Ürünleri, Sülfit",
                "en": "Gluten, Fish, Milk and Dairy Products, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Karides Florentine",
                "en": "Shrimp Florentine"
              },
              "desc": {
                "tr": "Ispanak, sarımsak, kremalı şarap sosu.",
                "en": "Spinach, garlic, creamy wine sauce."
              },
              "price": "725",
              "allergens": {
                "tr": "Kabuklular, Süt ve Süt Ürünleri, Sülfit, Gluten",
                "en": "Crustaceans, Milk and Dairy Products, Sulphites, Gluten"
              }
            },
            {
              "name": {
                "tr": "Şarküteri Tabağı",
                "en": "Charcuterie Platter"
              },
              "desc": {
                "tr": "Dört çeşit peynir, elma, iki çeşit füme eti, üzüm, kuruyemiş, grissini.",
                "en": "Four kinds of cheese, apple, two kinds of smoked meat, grapes, nuts, grissini."
              },
              "price": "825",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Hardal",
                "en": "Gluten, Milk and Dairy Products, Tree Nuts, Mustard"
              }
            },
            {
              "name": {
                "tr": "Dana Carpaccio",
                "en": "Beef Carpaccio"
              },
              "desc": {
                "tr": "Hardal sosu, az pişmiş dana eti, susam yağı, çeri domates, kırmızı soğan, glaze.",
                "en": "Mustard sauce, rare beef, sesame oil, cherry tomato, red onion, glaze."
              },
              "price": "825",
              "allergens": {
                "tr": "Hardal, Susam, Sülfit, Süt ve Süt Ürünleri",
                "en": "Mustard, Sesame, Sulphites, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Ahtapot Carpaccio",
                "en": "Octopus Carpaccio"
              },
              "desc": {
                "tr": "Roka, kaya koruğu, zeytinyağı, kekik, kapari, balsamik glaze.",
                "en": "Arugula, rock samphire, olive oil, oregano, capers, balsamic glaze."
              },
              "price": "875",
              "allergens": {
                "tr": "Sülfit, Yumuşakçalar, Soya",
                "en": "Sulphites, Molluscs, Soy"
              }
            },
            {
              "name": {
                "tr": "Marenka Tadım Tabağı",
                "en": "Marenka Tasting Platter"
              },
              "desc": {
                "tr": "Patates kızartması, Çin böreği, sigara böreği, hellim peyniri, tavuk finger, dana sosis, mozzarella stick.",
                "en": "French fries, Chinese spring rolls, cheese rolls, halloumi, chicken fingers, beef sausage, mozzarella sticks."
              },
              "price": "900",
              "allergens": {
                "tr": "Gluten, Yumurta, Soya, Süt ve Süt Ürünleri, Hardal, Susam",
                "en": "Gluten, Egg, Soy, Milk and Dairy Products, Mustard, Sesame"
              }
            },
            {
              "name": {
                "tr": "Kızarmış Kalamar",
                "en": "Fried Calamari"
              },
              "desc": {
                "tr": "Limon, bira, tartar sos.",
                "en": "Lemon, beer, tartar sauce."
              },
              "price": "975",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Hardal, Yumurta, Yumuşakçalar",
                "en": "Gluten, Milk and Dairy Products, Mustard, Egg, Molluscs"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Salatalar",
            "en": "Salads"
          },
          "items": [
            {
              "name": {
                "tr": "Zeytinyağlı Mevsim Salatası",
                "en": "Seasonal Salad with Olive Oil"
              },
              "desc": {
                "tr": "Mevsim yeşillikleri, çeri domates, salatalık, lahana, zeytinyağı ve limon sos.",
                "en": "Mixed greens, cherry tomato, cucumber, cabbage, olive oil and lemon dressing."
              },
              "price": "450",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Pancar Salatası",
                "en": "Beetroot Salad"
              },
              "desc": {
                "tr": "Roka, soğan, taze ekşi sos, yeşil elma, havuç, ceviz.",
                "en": "Arugula, onion, fresh sour sauce, green apple, carrot, walnuts."
              },
              "price": "450",
              "allergens": {
                "tr": "Kabuklu Kuruyemişler, Sülfit",
                "en": "Tree Nuts, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Yunan Salatası",
                "en": "Greek Salad"
              },
              "desc": {
                "tr": "Domates, soğan, zeytin, salatalık, beyaz peynir, kekik, kapya biber, zeytinyağı ve limon sos.",
                "en": "Tomato, onion, olives, cucumber, white cheese, oregano, kapia pepper, olive oil and lemon dressing."
              },
              "price": "500",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Sülfit",
                "en": "Milk and Dairy Products, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Yaz Salatası",
                "en": "Summer Salad"
              },
              "desc": {
                "tr": "Semizotu, kinoa, kuru kayısı, yeşil elma, kuru üzüm, ay çekirdeği, orange sos, zeytinyağı.",
                "en": "Purslane, quinoa, dried apricot, green apple, raisins, sunflower seeds, orange dressing, olive oil."
              },
              "price": "500",
              "allergens": {
                "tr": "Kabuklu Kuruyemişler, Sülfit, Hardal",
                "en": "Tree Nuts, Sulphites, Mustard"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Tavuk Yemekleri",
            "en": "Chicken"
          },
          "items": [
            {
              "name": {
                "tr": "Izgara Tavuk Göğsü",
                "en": "Grilled Chicken Breast"
              },
              "desc": {
                "tr": "Izgara sebzeler, patates, pilav.",
                "en": "Grilled vegetables, potatoes, rice pilaf."
              },
              "price": "650",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri",
                "en": "Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Tatlı Ekşi Tavuk",
                "en": "Sweet and Sour Chicken"
              },
              "desc": {
                "tr": "Pilav, ananas, kapya biber, lahana, soğan,tatlı ekşi sos.",
                "en": "Rice pilaf, pineapple, kapia pepper, cabbage, onion, sweet and sour sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Soya, Gluten, Susam",
                "en": "Soy, Gluten, Sesame"
              }
            },
            {
              "name": {
                "tr": "Karabiber Soslu Tavuk",
                "en": "Chicken in Black Pepper Sauce"
              },
              "desc": {
                "tr": "Patates püresi, sote sebzeler, konyak, demi-glace sos, taze karabiber. Acılı.",
                "en": "Mashed potatoes, sautéed vegetables, cognac, demi-glace sauce, fresh black pepper. Spicy."
              },
              "price": "750",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Kereviz, Gluten, Soya, Acı",
                "en": "Milk and Dairy Products, Celery, Gluten, Soy, Spicy"
              }
            },
            {
              "name": {
                "tr": "Pesto soslu Tavuk Fettuccine",
                "en": "Chicken Fettuccine with Pesto Sauce"
              },
              "desc": {
                "tr": "Tavuk, Sarımsak, krema, mantar.",
                "en": "Chicken, garlic, cream, mushroom."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler",
                "en": "Gluten, Egg, Milk and Dairy Products, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Ballı Körili Tavuk",
                "en": "Honey Curried Chicken"
              },
              "desc": {
                "tr": "Pilav, patates kızartması,ballı köri sos.",
                "en": "Rice pilaf, french fries, honey curry sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Hardal, Gluten, Süt ve Süt Ürünleri",
                "en": "Mustard, Gluten, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Tavuk Schnitzel",
                "en": "Chicken Schnitzel"
              },
              "desc": {
                "tr": "Sezar sos, mevsim salatası, parmesan, tereyağı.",
                "en": "Caesar dressing, seasonal salad, parmesan, butter."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Hardal",
                "en": "Gluten, Egg, Milk and Dairy Products, Mustard"
              }
            },
            {
              "name": {
                "tr": "Kremalı Mantarlı Tavuk",
                "en": "Creamy Mushroom Chicken"
              },
              "desc": {
                "tr": "Sote sebzeler, patates püresi, beyaz şarap, kremalı mantar sos.",
                "en": "Sautéed vegetables, mashed potatoes, white wine, creamy mushroom sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten, Hardal",
                "en": "Milk and Dairy Products, Gluten, Mustard"
              }
            },
            {
              "name": {
                "tr": "Asya Usulü Tavuk Şiş",
                "en": "Asian-Style Chicken Skewers"
              },
              "desc": {
                "tr": "Teriyaki sos, susam, pilav, sebzeler.",
                "en": "Teriyaki sauce, sesame, rice pilaf, vegetables."
              },
              "price": "800",
              "allergens": {
                "tr": "Soya, Susam, Gluten",
                "en": "Soy, Sesame, Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Et Yemekleri",
            "en": "Meat"
          },
          "items": [
            {
              "name": {
                "tr": "Patlıcan Püresi Üzerinde Izgara Köfte",
                "en": "Grilled Köfte over Eggplant Purée"
              },
              "desc": {
                "tr": "Patlıcan, mozzarella peyniri, ekmek, kırmızı kapya biber, domates sos, köfte.",
                "en": "Eggplant, mozzarella cheese, bread, red kapia pepper, tomato sauce, köfte."
              },
              "price": "825",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Ragù Fettuccine",
                "en": "Ragù Fettuccine"
              },
              "desc": {
                "tr": "Dana bonfile, pembe sos, kırmızı şarap, kapya biber az acı",
                "en": "Beef tenderloin, pink sauce, red wine, kapia pepper, mildly spicy."
              },
              "price": "875",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kereviz, Acı",
                "en": "Gluten, Egg, Milk and Dairy Products, Celery, Spicy"
              }
            },
            {
              "name": {
                "tr": "Dana Çökertme",
                "en": "Beef Çökertme"
              },
              "desc": {
                "tr": "Çıtır patates, domates sos, yoğurt, kırmızı sarımsaklı tereyağı.",
                "en": "Crispy potatoes, tomato sauce, yogurt, red garlic butter."
              },
              "price": "1050",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Bonfile Steak",
                "en": "Tenderloin Steak"
              },
              "desc": {
                "tr": "Sote sebzeler, pavé patates.",
                "en": "Sautéed vegetables, pavé potatoes."
              },
              "price": "1550",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Karabiber Soslu Steak",
                "en": "Steak in Black Pepper Sauce"
              },
              "desc": {
                "tr": "Demi-glace karabiber sos, patates püresi, konyak, sote sebzeler. Acılı.",
                "en": "Demi-glace black pepper sauce, mashed potatoes, cognac, sautéed vegetables. Spicy."
              },
              "price": "1650",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Kereviz, Acı, Gluten",
                "en": "Milk and Dairy Products, Celery, Spicy, Gluten"
              }
            },
            {
              "name": {
                "tr": "Kremalı Mantarlı Steak",
                "en": "Creamy Mushroom Steak"
              },
              "desc": {
                "tr": "Sote sebzeler, pavé patates, beyaz şarap, kremalı mantar sos.",
                "en": "Sautéed vegetables, pavé potatoes, white wine, creamy mushroom sauce."
              },
              "price": "1700",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Gorgonzola Steak",
                "en": "Gorgonzola Steak"
              },
              "desc": {
                "tr": "Sote sebzeler, gorgonzola sos, beyaz şarap, pavé patates.",
                "en": "Sautéed vegetables, gorgonzola sauce, white wine, pavé potatoes."
              },
              "price": "1800",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Kuzu Pirzola",
                "en": "Lamb Chops"
              },
              "desc": {
                "tr": "Kırmızı üzümlü karamelize şarap sosu, nane sosu, sote sebzeler.",
                "en": "Caramelized red grape wine sauce, mint sauce, sautéed vegetables."
              },
              "price": "1800",
              "allergens": {
                "tr": "Sülfit, Süt ve Süt Ürünleri",
                "en": "Sulphites, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Surf & Turf (Bonfile&Karides)",
                "en": "Surf & Turf (Tenderloin & Shrimp)"
              },
              "desc": {
                "tr": "Sote ıspanak, patates püresi, sarımsaklı tereyağı, pembe sos.",
                "en": "Sautéed spinach, mashed potatoes, garlic butter, pink sauce."
              },
              "price": "1850",
              "allergens": {
                "tr": "Kabuklular, Süt ve Süt Ürünleri, Gluten",
                "en": "Crustaceans, Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Cordon Bleu",
                "en": "Cordon Bleu"
              },
              "desc": {
                "tr": "Füme hindi ve dana eti, sarımsaklı tereyağı, kremalı mantar sos.",
                "en": "Smoked turkey and beef, garlic butter, creamy mushroom sauce."
              },
              "price": "1950",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Balık & Deniz Ürünleri",
            "en": "Fish & Seafood"
          },
          "items": [
            {
              "name": {
                "tr": "Geleneksel Izgara Çipura",
                "en": "Traditional Grilled Sea Bream"
              },
              "desc": {
                "tr": "Zeytinyağı, sarımsak, limon sos.",
                "en": "Olive oil, garlic, lemon sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Balık, Gluten",
                "en": "Fish, Gluten"
              }
            },
            {
              "name": {
                "tr": "Chimichurri Levrek",
                "en": "Chimichurri Sea Bass"
              },
              "desc": {
                "tr": "Izgara lime, pavé patates, sote ıspanak, chimichurri sos. Acılı.",
                "en": "Grilled lime, pavé potatoes, sautéed spinach, chimichurri sauce. Spicy."
              },
              "price": "750",
              "allergens": {
                "tr": "Balık, Sülfit, Hardal, Acı",
                "en": "Fish, Sulphites, Mustard, Spicy"
              }
            },
            {
              "name": {
                "tr": "Ballı Hardal Soslu Izgara Balık Fileto",
                "en": "Grilled Fish Fillet in Honey Mustard Sauce"
              },
              "desc": {
                "tr": "Sote ıspanak, patates püresi.",
                "en": "Sautéed spinach, mashed potatoes."
              },
              "price": "1050",
              "allergens": {
                "tr": "Balık, Süt ve Süt Ürünleri, Hardal",
                "en": "Fish, Milk and Dairy Products, Mustard"
              }
            },
            {
              "name": {
                "tr": "Izgara Somon Fileto",
                "en": "Grilled Salmon Fillet"
              },
              "desc": {
                "tr": "Sote ıspanak, patates püresi.",
                "en": "Sautéed spinach, mashed potatoes."
              },
              "price": "1050",
              "allergens": {
                "tr": "Balık, Süt ve Süt Ürünleri, Gluten",
                "en": "Fish, Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Deniz Ürünlü Spaghetti",
                "en": "Seafood Spaghetti"
              },
              "desc": {
                "tr": "Karışık deniz ürünleri, beyaz şarap, kremalı şarap sosu.",
                "en": "Mixed seafood, white wine, creamy wine sauce."
              },
              "price": "950",
              "allergens": {
                "tr": "Gluten, Kabuklular, Balık, Süt ve Süt Ürünleri, Sülfit, Yumuşakçalar",
                "en": "Gluten, Crustaceans, Fish, Milk and Dairy Products, Sulphites, Molluscs"
              }
            },
            {
              "name": {
                "tr": "Deniz Ürünlü Paella",
                "en": "Seafood Paella"
              },
              "desc": {
                "tr": "Karışık deniz ürünleri, beyaz şarap.",
                "en": "Mixed seafood, white wine."
              },
              "price": "1300",
              "allergens": {
                "tr": "Kabuklular, Balık, Yumuşakçalar, Süt ve Süt Ürünleri, Sülfit",
                "en": "Crustaceans, Fish, Molluscs, Milk and Dairy Products, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Izgara Karides",
                "en": "Grilled Shrimp"
              },
              "desc": {
                "tr": "Patates püresi, Izgara lime, chimichurri sos, chili biberi, karışık salata, sote ıspanak, Tom Yum sos.",
                "en": "Mashed potatoes, grilled lime, chimichurri sauce, chili pepper, mixed salad, sautéed spinach, Tom Yum sauce."
              },
              "price": "1350",
              "allergens": {
                "tr": "Kabuklular, Süt ve Süt Ürünleri, Acı, Balık, Sülfit",
                "en": "Crustaceans, Milk and Dairy Products, Spicy, Fish, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Izgara Ahtapot",
                "en": "Grilled Octopus"
              },
              "desc": {
                "tr": "Fava püresi, roka, soya sosu, sarımsaklı zeytinyağı sosu.",
                "en": "Fava purée, arugula, soy sauce, garlic olive oil sauce."
              },
              "price": "1600",
              "allergens": {
                "tr": "Soya, Süt ve Süt Ürünleri, Yumuşakçalar, Sülfit, Bakla",
                "en": "Soy, Milk and Dairy Products, Molluscs, Sulphites, Broad Beans"
              }
            },
            {
              "name": {
                "tr": "Marenka Deniz Ürünleri Tabağı",
                "en": "Marenka Seafood Platter"
              },
              "desc": {
                "tr": "Balık şiş, karides, kalamar, ahtapot, bira, sarımsaklı zeytinyağlı limon sos, Akdeniz yeşillikleri.",
                "en": "Fish skewers, shrimp, calamari, octopus, beer, garlic olive oil and lemon sauce, Mediterranean greens."
              },
              "price": "1950",
              "allergens": {
                "tr": "Kabuklular, Balık, Yumuşakçalar, Süt ve Süt Ürünleri, Gluten, Soya",
                "en": "Crustaceans, Fish, Molluscs, Milk and Dairy Products, Gluten, Soy"
              }
            },
            {
              "name": {
                "tr": "Kalamar Dolması",
                "en": "Stuffed Calamari"
              },
              "desc": {
                "tr": "Yeşil zeytin, ahtapot, bira, karides, karışık sebzeler, mozzarella, chimichurri.",
                "en": "Green olives, octopus, beer, shrimp, mixed vegetables, mozzarella, chimichurri."
              },
              "price": "1950",
              "allergens": {
                "tr": "Kabuklular, Süt ve Süt Ürünleri, Yumuşakçalar, Gluten",
                "en": "Crustaceans, Milk and Dairy Products, Molluscs, Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Pizzalar",
            "en": "Pizzas"
          },
          "items": [
            {
              "name": {
                "tr": "Margherita Pizza",
                "en": "Margherita Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri.",
                "en": "Tomato sauce, mozzarella cheese."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Hindili Calzone Sandviç",
                "en": "Turkey Calzone Sandwich"
              },
              "desc": {
                "tr": "Hindi, Soğan, Akdeniz yeşillikleri, parmesan.",
                "en": "Turkey, onion, Mediterranean greens, parmesan."
              },
              "price": "575",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta, Hardal",
                "en": "Gluten, Milk and Dairy Products, Egg, Mustard"
              }
            },
            {
              "name": {
                "tr": "Karışık Pizza",
                "en": "Mixed Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri, sucuk, dana sosis, mantar, taze biber, mısır.",
                "en": "Tomato sauce, mozzarella cheese, sucuk, beef sausage, mushroom, fresh pepper, corn."
              },
              "price": "650",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Soy, Egg"
              }
            },
            {
              "name": {
                "tr": "Alaturca Pizza",
                "en": "Alaturca Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri, füme dana eti, Türk sucuğu, zeytin, biber.",
                "en": "Tomato sauce, mozzarella cheese, smoked beef, Turkish sucuk, olives, pepper."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Yumurta, Hardal",
                "en": "Gluten, Milk and Dairy Products, Soy, Egg, Mustard"
              }
            },
            {
              "name": {
                "tr": "Quattro Formaggi",
                "en": "Quattro Formaggi"
              },
              "desc": {
                "tr": "Crème fraîche sos, parmesan, mozzarella peyniri, Kars gravyeri, gorgonzola peyniri.",
                "en": "Crème fraîche sauce, parmesan, mozzarella cheese, Kars gruyère, gorgonzola cheese."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Marenka Buffalo Pizza",
                "en": "Marenka Buffalo Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri, dana bonfile, roka, parmesan, karamelize soğan, jalapeño biberi.",
                "en": "Tomato sauce, mozzarella cheese, beef tenderloin, arugula, parmesan, caramelized onion, jalapeño pepper."
              },
              "price": "875",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta, Acı",
                "en": "Gluten, Milk and Dairy Products, Egg, Spicy"
              }
            },
            {
              "name": {
                "tr": "Marenka Deniz Ürünleri Pizza",
                "en": "Marenka Seafood Pizza"
              },
              "desc": {
                "tr": "Pesto sos, mozzarella peyniri, karides, kalamar, somon, ahtapot, roka, parmesan peyniri.",
                "en": "Pesto sauce, mozzarella cheese, shrimp, calamari, salmon, octopus, arugula, parmesan cheese."
              },
              "price": "950",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta, Kabuklular, Yumuşakçalar, Balık",
                "en": "Gluten, Milk and Dairy Products, Egg, Crustaceans, Molluscs, Fish"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Çocuk Menüsü",
            "en": "Kids' Menu"
          },
          "items": [
            {
              "name": {
                "tr": "Pizza & Patates",
                "en": "Pizza & Fries"
              },
              "desc": {
                "tr": "Mozzarella peyniri, domates sos, patates cipsi.",
                "en": "Mozzarella cheese, tomato sauce, potato chips."
              },
              "price": "400",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Soya, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Soy, Egg"
              }
            },
            {
              "name": {
                "tr": "Hamburger & Patates",
                "en": "Hamburger & Fries"
              },
              "desc": {
                "tr": "Dana kıyma hamburger, patates cipsi.",
                "en": "Ground beef burger, potato chips."
              },
              "price": "450",
              "allergens": {
                "tr": "Gluten, Yumurta, Hardal, Süt ve Süt Ürünleri, Susam, Soya",
                "en": "Gluten, Egg, Mustard, Milk and Dairy Products, Sesame, Soy"
              }
            },
            {
              "name": {
                "tr": "Bolognese soslu Makarna",
                "en": "Pasta with Bolognese Sauce"
              },
              "desc": {
                "tr": "Dana kıyma, soğan, karabiber, havuç, kereviz, domates sos.",
                "en": "Ground beef, onion, black pepper, carrot, celery, tomato sauce."
              },
              "price": "475",
              "allergens": {
                "tr": "Gluten, Kereviz, Süt ve Süt Ürünleri",
                "en": "Gluten, Celery, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Köfte & Pilav & Patates",
                "en": "Köfte & Rice Pilaf & Fries"
              },
              "desc": {
                "tr": "Dana kıyma, pilav, patates cipsi.",
                "en": "Ground beef, rice pilaf, potato chips."
              },
              "price": "525",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Tatlılar",
            "en": "Desserts"
          },
          "items": [
            {
              "name": {
                "tr": "Karpuz Tabağı",
                "en": "Watermelon Platter"
              },
              "desc": {
                "tr": "Karpuz",
                "en": "Watermelon."
              },
              "price": "300",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "Brownie",
                "en": "Brownie"
              },
              "desc": {
                "tr": "Tereyağı, yumurta,şeker,çikolata,un,kakao,kabartma tozu.",
                "en": "Butter, egg, sugar, chocolate, flour, cocoa, baking powder."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten, Kabuklu Kuruyemişler",
                "en": "Egg, Milk and Dairy Products, Gluten, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Tiramisu",
                "en": "Tiramisu"
              },
              "desc": {
                "tr": "Labne,şanti,yumurta,toz jelatin,kahve,kedi dili,kakao,şeker.",
                "en": "Labneh, whipped cream, egg, powdered gelatin, coffee, ladyfingers, cocoa, sugar."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten",
                "en": "Egg, Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Profiterol",
                "en": "Profiterole"
              },
              "desc": {
                "tr": "Yumurta, un,şeker,süt,çikolata, kakao,bitkisel yağ.",
                "en": "Egg, flour, sugar, milk, chocolate, cocoa, vegetable oil."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten",
                "en": "Egg, Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Günün Tatlısı",
                "en": "Dessert of the Day"
              },
              "desc": {
                "tr": "***İçeriğe göre değişir",
                "en": "***Varies by preparation"
              },
              "price": "400",
              "allergens": {
                "tr": "Servis personeline danışınız",
                "en": "Please ask our staff"
              }
            },
            {
              "name": {
                "tr": "Meyve Tabağı",
                "en": "Fruit Platter"
              },
              "desc": {
                "tr": "Mevsim meyveleri.",
                "en": "Seasonal fruits."
              },
              "price": "400",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "San Sebastian Cheesecake",
                "en": "San Sebastian Cheesecake"
              },
              "desc": {
                "tr": "Sos seçimi: vişne sos veya çikolata sos.",
                "en": "Choice of sauce: cherry sauce or chocolate sauce."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Panna Cotta",
                "en": "Panna Cotta"
              },
              "desc": {
                "tr": "Süt,şeker,krema",
                "en": "Milk, sugar, cream."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "set",
      "navLabel": {
        "tr": "Set Menü",
        "en": "Set Menu"
      },
      "label": {
        "tr": "Set Menü",
        "en": "Set Menu"
      },
      "groups": [
        {
          "label": {
            "tr": "Tatlılar",
            "en": "Desserts"
          },
          "items": [
            {
              "name": {
                "tr": "Karpuz Tabağı",
                "en": "Watermelon Platter"
              },
              "desc": {
                "tr": "Karpuz",
                "en": "Watermelon."
              },
              "price": "300",
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "San Sebastian Cheesecake",
                "en": "San Sebastian Cheesecake"
              },
              "desc": {
                "tr": "Sos seçimi: vişne sos veya çikolata sos.",
                "en": "Choice of sauce: cherry sauce or chocolate sauce."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Panna Cotta",
                "en": "Panna Cotta"
              },
              "desc": {
                "tr": "Süt,şeker,krema",
                "en": "Milk, sugar, cream."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri",
                "en": "Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Brownie",
                "en": "Brownie"
              },
              "desc": {
                "tr": "Tereyağı, yumurta,şeker,çikolata,un,kakao,kabartma tozu.",
                "en": "Butter, egg, sugar, chocolate, flour, cocoa, baking powder."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten, Kabuklu Kuruyemişler",
                "en": "Egg, Milk and Dairy Products, Gluten, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Tiramisu",
                "en": "Tiramisu"
              },
              "desc": {
                "tr": "Labne,şanti,yumurta,toz jelatin,kahve,kedi dili,kakao,şeker.",
                "en": "Labneh, whipped cream, egg, powdered gelatin, coffee, ladyfingers, cocoa, sugar."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten",
                "en": "Egg, Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Profiterol",
                "en": "Profiterole"
              },
              "desc": {
                "tr": "Yumurta, un,şeker,süt,çikolata, kakao,bitkisel yağ.",
                "en": "Egg, flour, sugar, milk, chocolate, cocoa, vegetable oil."
              },
              "price": "400",
              "allergens": {
                "tr": "Yumurta, Süt ve Süt Ürünleri, Gluten",
                "en": "Egg, Milk and Dairy Products, Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Başlangıçlar",
            "en": "Starters"
          },
          "items": [
            {
              "name": {
                "tr": "Çin Böreği",
                "en": "Chinese Spring Rolls"
              },
              "desc": {
                "tr": "Havuç, kabak, lahana, soğan, pırasa, soya sosu.",
                "en": "Carrot, zucchini, cabbage, onion, leek, soy sauce."
              },
              "price": "325",
              "allergens": {
                "tr": "Gluten, Soya, Yumurta",
                "en": "Gluten, Soy, Egg"
              }
            },
            {
              "name": {
                "tr": "Tavuk Çorbası",
                "en": "Chicken Soup"
              },
              "desc": {
                "tr": "Tavuk suyu, havuç, krema, un.",
                "en": "Chicken stock, carrot, cream, flour."
              },
              "price": "350",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri",
                "en": "Gluten, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Izgara Hellim",
                "en": "Grilled Halloumi"
              },
              "desc": {
                "tr": "Izgara kapya biber, pesto, glaze sos.",
                "en": "Grilled kapia pepper, pesto, glaze sauce."
              },
              "price": "375",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Kabuklu Kuruyemişler, Sülfit",
                "en": "Milk and Dairy Products, Tree Nuts, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Buffalo Kanatları",
                "en": "Buffalo Wings"
              },
              "desc": {
                "tr": "Blue cheese sos ve sweet chili sos.Acılı",
                "en": "Blue cheese sauce and sweet chili sauce. Spicy."
              },
              "price": "400",
              "allergens": {
                "tr": "Gluten, Soya, Hardal, Sülfit, Süt ve Süt Ürünleri, Acı",
                "en": "Gluten, Soy, Mustard, Sulphites, Milk and Dairy Products, Spicy"
              }
            },
            {
              "name": {
                "tr": "Pancar Salatası",
                "en": "Beetroot Salad"
              },
              "desc": {
                "tr": "Roka, soğan, taze ekşi sos, yeşil elma, havuç, ceviz.",
                "en": "Arugula, onion, fresh sour sauce, green apple, carrot, walnuts."
              },
              "price": "450",
              "allergens": {
                "tr": "Kabuklu Kuruyemişler, Sülfit",
                "en": "Tree Nuts, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Ege Bahçesi",
                "en": "Aegean Garden"
              },
              "desc": {
                "tr": "Mevsim yeşillikleri, domates, salatalık, havuç, lahana, pancar, zeytinyağı ve limon sos",
                "en": "Mixed greens, tomato, cucumber, carrot, cabbage, beetroot, olive oil and lemon dressing."
              },
              "allergens": {
                "tr": "Belirgin alerjen yok",
                "en": "No major allergens"
              }
            },
            {
              "name": {
                "tr": "Peynirli Sarımsaklı Ekmek",
                "en": "Cheesy Garlic Bread"
              },
              "desc": {
                "tr": "Baget ekmek tereyağlı baharatlı sarımsak sos mozerella peyniri.",
                "en": "Baguette, butter, spiced garlic sauce, mozzarella cheese."
              },
              "price": "325",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Ana Yemekler",
            "en": "Main Courses"
          },
          "items": [
            {
              "name": {
                "tr": "Margherita Pizza",
                "en": "Margherita Pizza"
              },
              "desc": {
                "tr": "Domates sos, mozzarella peyniri.",
                "en": "Tomato sauce, mozzarella cheese."
              },
              "price": "550",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Quattro Formaggi",
                "en": "Quattro Formaggi"
              },
              "desc": {
                "tr": "Crème fraîche sos, parmesan, mozzarella peyniri, Kars gravyeri, gorgonzola peyniri.",
                "en": "Crème fraîche sauce, parmesan, mozzarella cheese, Kars gruyère, gorgonzola cheese."
              },
              "price": "675",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri, Yumurta",
                "en": "Gluten, Milk and Dairy Products, Egg"
              }
            },
            {
              "name": {
                "tr": "Geleneksel Izgara Çipura",
                "en": "Traditional Grilled Sea Bream"
              },
              "desc": {
                "tr": "Zeytinyağı, sarımsak, limon sos.",
                "en": "Olive oil, garlic, lemon sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Balık, Gluten",
                "en": "Fish, Gluten"
              }
            },
            {
              "name": {
                "tr": "Pesto Tavuk Fettuccine Deluxe",
                "en": "Pesto Chicken Fettuccine Deluxe"
              },
              "desc": {
                "tr": "Sarımsak, krema, mantar.",
                "en": "Garlic, cream, mushroom."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Kabuklu Kuruyemişler",
                "en": "Gluten, Egg, Milk and Dairy Products, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Tavuk Schnitzel",
                "en": "Chicken Schnitzel"
              },
              "desc": {
                "tr": "Sezar sos, mevsim salatası, parmesan, tereyağı.",
                "en": "Caesar dressing, seasonal salad, parmesan, butter."
              },
              "price": "750",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri, Hardal",
                "en": "Gluten, Egg, Milk and Dairy Products, Mustard"
              }
            },
            {
              "name": {
                "tr": "Ballı Körili Tavuk",
                "en": "Honey Curried Chicken"
              },
              "desc": {
                "tr": "Pilav, patates kızartması,ballı köri sos.",
                "en": "Rice pilaf, french fries, honey curry sauce."
              },
              "price": "750",
              "allergens": {
                "tr": "Hardal, Gluten, Süt ve Süt Ürünleri",
                "en": "Mustard, Gluten, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Patlıcan Püresi Üzerinde Izgara Köfte",
                "en": "Grilled Köfte over Eggplant Purée"
              },
              "desc": {
                "tr": "Patlıcan, mozzarella peyniri, ekmek, kırmızı kapya biber, domates sos, köfte.",
                "en": "Eggplant, mozzarella cheese, bread, red kapia pepper, tomato sauce, köfte."
              },
              "price": "825",
              "allergens": {
                "tr": "Gluten, Yumurta, Süt ve Süt Ürünleri",
                "en": "Gluten, Egg, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Somon Fettuccine",
                "en": "Salmon Fettuccine"
              },
              "desc": {
                "tr": "Şaraplı krema sos, karışık biberler, kapari.",
                "en": "Wine cream sauce, mixed peppers, capers."
              },
              "price": "900",
              "allergens": {
                "tr": "Gluten, Yumurta, Balık, Süt ve Süt Ürünleri, Sülfit",
                "en": "Gluten, Egg, Fish, Milk and Dairy Products, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Dana Çökertme",
                "en": "Beef Çökertme"
              },
              "desc": {
                "tr": "Çıtır patates, domates sos, yoğurt, kırmızı sarımsaklı tereyağı.",
                "en": "Crispy potatoes, tomato sauce, yogurt, red garlic butter."
              },
              "price": "1050",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri, Gluten",
                "en": "Milk and Dairy Products, Gluten"
              }
            },
            {
              "name": {
                "tr": "Ballı Hardal Soslu Izgara Balık Fileto",
                "en": "Grilled Fish Fillet in Honey Mustard Sauce"
              },
              "desc": {
                "tr": "Sote ıspanak, patates püresi.",
                "en": "Sautéed spinach, mashed potatoes."
              },
              "price": "1050",
              "allergens": {
                "tr": "Balık, Süt ve Süt Ürünleri, Hardal",
                "en": "Fish, Milk and Dairy Products, Mustard"
              }
            },
            {
              "name": {
                "tr": "Chicken Diana",
                "en": "Chicken Diana"
              },
              "desc": {
                "tr": "Sote sebzeler, patates püresi",
                "en": "Sautéed vegetables, mashed potatoes."
              },
              "allergens": {
                "tr": "Süt ve Süt Ürünleri",
                "en": "Milk and Dairy Products"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "kokteyl",
      "navLabel": {
        "tr": "Kokteyl",
        "en": "Cocktails"
      },
      "label": {
        "tr": "Kokteyller",
        "en": "Cocktails"
      },
      "banner": {
        "eyebrow": {
          "tr": "Bar'dan",
          "en": "From the Bar"
        },
        "title": {
          "tr": "İçkiler",
          "en": "Drinks"
        }
      },
      "groups": [
        {
          "label": {
            "tr": "İmza Kokteyller",
            "en": "Signature Cocktails"
          },
          "note": {
            "tr": "Her biri 750 ₺",
            "en": "Each 750 ₺"
          },
          "items": [
            {
              "name": {
                "tr": "4 Queens",
                "en": "4 Queens"
              },
              "desc": {
                "tr": "Beefeater Gin, sorrel, oleo saccharum, coriander, basil, mint oil, lemon, foamer",
                "en": "Beefeater Gin, sorrel, oleo saccharum, coriander, basil, mint oil, lemon, foamer"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Pika Nehirita",
                "en": "Pika Nehirita"
              },
              "desc": {
                "tr": "Chili-infused Olmeca Tequila, Cointreau, mango, lime, simple syrup, foamer",
                "en": "Chili-infused Olmeca Tequila, Cointreau, mango, lime, simple syrup, foamer"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Sloe Whisper",
                "en": "Sloe Whisper"
              },
              "desc": {
                "tr": "Monkey 47 Sloe Gin, limoncello, foamer, cranberry-hibiscus cordial, lemongrass, lemon",
                "en": "Monkey 47 Sloe Gin, limoncello, foamer, cranberry-hibiscus cordial, lemongrass, lemon"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Love Actually",
                "en": "Love Actually"
              },
              "desc": {
                "tr": "Malfy Gin Rosa, Aperol, fresh grapefruit, lemongrass-elderflower cordial, lime, foamer",
                "en": "Malfy Gin Rosa, Aperol, fresh grapefruit, lemongrass-elderflower cordial, lime, foamer"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Golden Passion",
                "en": "Golden Passion"
              },
              "desc": {
                "tr": "Havana Club 3 Años Rum, passion fruit, citrus blend, simple syrup, lime",
                "en": "Havana Club 3 Años Rum, passion fruit, citrus blend, simple syrup, lime"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Madam Ruj",
                "en": "Madam Ruj"
              },
              "desc": {
                "tr": "Beefeater Gin, Campari, beetroot-blackberry cordial, celery, citrus blend",
                "en": "Beefeater Gin, Campari, beetroot-blackberry cordial, celery, citrus blend"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Pomegranate Ritual",
                "en": "Pomegranate Ritual"
              },
              "desc": {
                "tr": "Havana Club 3 Años Rum, St-Germain, fresh pomegranate juice, citrus blend",
                "en": "Havana Club 3 Años Rum, St-Germain, fresh pomegranate juice, citrus blend"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Luna",
                "en": "Luna"
              },
              "desc": {
                "tr": "Butterfly pea tea-infused Absolut Vodka, St-Germain, purple basil, lime, foamer",
                "en": "Butterfly pea tea-infused Absolut Vodka, St-Germain, purple basil, lime, foamer"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "AA No:3",
                "en": "AA No:3"
              },
              "desc": {
                "tr": "Jameson Black Barrel, orange liqueur, yuzu, honey, ginger, lime",
                "en": "Jameson Black Barrel, orange liqueur, yuzu, honey, ginger, lime"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Pachamama",
                "en": "Pachamama"
              },
              "desc": {
                "tr": "Pisco Lapostolle, ginger liqueur, turmeric-mango cordial, citrus blend",
                "en": "Pisco Lapostolle, ginger liqueur, turmeric-mango cordial, citrus blend"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Livberry",
                "en": "Livberry"
              },
              "desc": {
                "tr": "Fresh strawberry-infused Beefeater Pink Gin, Aperol, lemongrass, saline solution, citrus blend",
                "en": "Fresh strawberry-infused Beefeater Pink Gin, Aperol, lemongrass, saline solution, citrus blend"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Lila Breeze",
                "en": "Lila Breeze"
              },
              "desc": {
                "tr": "Absolut Vodka, hibiscus cordial, pumpkin spice, citrus blend",
                "en": "Absolut Vodka, hibiscus cordial, pumpkin spice, citrus blend"
              },
              "price": "750"
            },
            {
              "name": {
                "tr": "Libre Libra",
                "en": "Libre Libra"
              },
              "desc": {
                "tr": "Jameson, peach, bergamot, vanilla, lemon",
                "en": "Jameson, peach, bergamot, vanilla, lemon"
              },
              "price": "750"
            }
          ]
        },
        {
          "label": {
            "tr": "Klasik & Uluslararası",
            "en": "Classic & International"
          },
          "items": [
            {
              "name": {
                "tr": "Long Island Iced Tea",
                "en": "Long Island Iced Tea"
              },
              "desc": {
                "tr": "Absolut Vodka, Beefeater Gin, Havana Club 3 Rum, Olmeca Tequila, Cointreau, cola, sour mix",
                "en": "Absolut Vodka, Beefeater Gin, Havana Club 3 Rum, Olmeca Tequila, Cointreau, cola, sour mix"
              },
              "price": "780",
              "allergens": {
                "tr": "Sülfit, Gluten",
                "en": "Sulphites, Gluten"
              }
            },
            {
              "name": {
                "tr": "Moscow Mule",
                "en": "Moscow Mule"
              },
              "desc": {
                "tr": "Absolut Vodka, ginger ale, mint, lime",
                "en": "Absolut Vodka, ginger ale, mint, lime"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "London Mule",
                "en": "London Mule"
              },
              "desc": {
                "tr": "Beefeater Gin, ginger ale, mint, lime",
                "en": "Beefeater Gin, ginger ale, mint, lime"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Margarita",
                "en": "Margarita"
              },
              "desc": {
                "tr": "Olmeca Tequila, Cointreau, lime juice",
                "en": "Olmeca Tequila, Cointreau, lime juice"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Lynchburg Lemonade",
                "en": "Lynchburg Lemonade"
              },
              "desc": {
                "tr": "Jack Daniel's, Cointreau, lemon juice, Sprite",
                "en": "Jack Daniel's, Cointreau, lemon juice, Sprite"
              },
              "price": "680",
              "allergens": {
                "tr": "Gluten, Sülfit",
                "en": "Gluten, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Mojito",
                "en": "Mojito"
              },
              "desc": {
                "tr": "Havana Club 3 Rum, fresh lime, mint leaves, lemon, simple syrup, soda",
                "en": "Havana Club 3 Rum, fresh lime, mint leaves, lemon, simple syrup, soda"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Piña Colada",
                "en": "Piña Colada"
              },
              "desc": {
                "tr": "Havana Club 3 Rum, Malibu, cream, pineapple juice, pineapple",
                "en": "Havana Club 3 Rum, Malibu, cream, pineapple juice, pineapple"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit, Süt ve Süt Ürünleri",
                "en": "Sulphites, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Bellini",
                "en": "Bellini"
              },
              "desc": {
                "tr": "Peach, Prosecco — Prosecco, stoğa göre şampanya ile değiştirilebilir.",
                "en": "Peach, Prosecco — Prosecco may be replaced with Champagne depending on availability."
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Cosmopolitan",
                "en": "Cosmopolitan"
              },
              "desc": {
                "tr": "Absolut Vodka, Cointreau, lemon juice, cranberry juice",
                "en": "Absolut Vodka, Cointreau, lemon juice, cranberry juice"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Caipirinha",
                "en": "Caipirinha"
              },
              "desc": {
                "tr": "Canario Cachaça, fresh lime, brown sugar",
                "en": "Canario Cachaça, fresh lime, brown sugar"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Paloma",
                "en": "Paloma"
              },
              "desc": {
                "tr": "Olmeca Tequila, fresh grapefruit juice, lime juice, soda",
                "en": "Olmeca Tequila, fresh grapefruit juice, lime juice, soda"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Frozen Daiquiri",
                "en": "Frozen Daiquiri"
              },
              "desc": {
                "tr": "Mango, strawberry, watermelon, passion fruit, Havana Club 3 Años Rum",
                "en": "Mango, strawberry, watermelon, passion fruit, Havana Club 3 Años Rum"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Bloody Mary",
                "en": "Bloody Mary"
              },
              "desc": {
                "tr": "Absolut Vodka, Worcestershire sauce, tomato juice, lemon juice, Tabasco, salt & black pepper",
                "en": "Absolut Vodka, Worcestershire sauce, tomato juice, lemon juice, Tabasco, salt & black pepper"
              },
              "price": "680",
              "allergens": {
                "tr": "Sülfit, Gluten, Soya",
                "en": "Sulphites, Gluten, Soy"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Sour",
            "en": "Sour"
          },
          "items": [
            {
              "name": {
                "tr": "Whisky Sour",
                "en": "Whisky Sour"
              },
              "desc": {
                "tr": "Woodford Reserve, lemon juice, simple syrup, foamer",
                "en": "Woodford Reserve, lemon juice, simple syrup, foamer"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit, Gluten",
                "en": "Sulphites, Gluten"
              }
            },
            {
              "name": {
                "tr": "Amaretto Sour",
                "en": "Amaretto Sour"
              },
              "desc": {
                "tr": "Disaronno, lemon juice, simple syrup, foamer",
                "en": "Disaronno, lemon juice, simple syrup, foamer"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit, Kabuklu Kuruyemişler",
                "en": "Sulphites, Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Pisco Sour",
                "en": "Pisco Sour"
              },
              "desc": {
                "tr": "Lapostolle, lemon juice, simple syrup, foamer",
                "en": "Lapostolle, lemon juice, simple syrup, foamer"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Bumbu Sour",
                "en": "Bumbu Sour"
              },
              "desc": {
                "tr": "Bumbu Rum, lemon juice, simple syrup, foamer",
                "en": "Bumbu Rum, lemon juice, simple syrup, foamer"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Campari Sour",
                "en": "Campari Sour"
              },
              "desc": {
                "tr": "Campari, lemon juice, simple syrup, foamer",
                "en": "Campari, lemon juice, simple syrup, foamer"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Negroni",
            "en": "Negroni",
            "latin": true
          },
          "items": [
            {
              "name": {
                "tr": "Classic Negroni",
                "en": "Classic Negroni"
              },
              "desc": {
                "tr": "Beefeater Gin, Campari, Martini Rosso",
                "en": "Beefeater Gin, Campari, Martini Rosso"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Barrel-Aged Negroni",
                "en": "Barrel-Aged Negroni"
              },
              "desc": {
                "tr": "Beefeater Gin, Campari, Martini Rosso — Fıçıda 30 gün dinlendirilmiştir.",
                "en": "Beefeater Gin, Campari, Martini Rosso — Barrel-aged for 30 days."
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Nergisroni",
                "en": "Nergisroni"
              },
              "desc": {
                "tr": "Beefeater Gin, Suze, Lillet Blanc",
                "en": "Beefeater Gin, Suze, Lillet Blanc"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Hibiscus Negroni",
                "en": "Hibiscus Negroni"
              },
              "desc": {
                "tr": "Beefeater Gin, Campari, hibiscus, Martini Rosso",
                "en": "Beefeater Gin, Campari, hibiscus, Martini Rosso"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Espresso Negroni",
                "en": "Espresso Negroni"
              },
              "desc": {
                "tr": "Beefeater Gin, coffee-infused Campari, Martini Rosso",
                "en": "Beefeater Gin, coffee-infused Campari, Martini Rosso"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Spritz",
            "en": "Spritz",
            "latin": true
          },
          "items": [
            {
              "name": {
                "tr": "Aperol Spritz",
                "en": "Aperol Spritz"
              },
              "desc": {
                "tr": "Aperol, Prosecco, sparkling water",
                "en": "Aperol, Prosecco, sparkling water"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Campari Spritz",
                "en": "Campari Spritz"
              },
              "desc": {
                "tr": "Campari, Prosecco, grapefruit, sparkling water",
                "en": "Campari, Prosecco, grapefruit, sparkling water"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Hugo Spritz",
                "en": "Hugo Spritz"
              },
              "desc": {
                "tr": "St-Germain, Prosecco, sparkling water",
                "en": "St-Germain, Prosecco, sparkling water"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Chambord Spritz",
                "en": "Chambord Spritz"
              },
              "desc": {
                "tr": "Chambord, Prosecco, sparkling water",
                "en": "Chambord, Prosecco, sparkling water"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Limoncello Spritz",
                "en": "Limoncello Spritz"
              },
              "desc": {
                "tr": "Homemade limoncello, Prosecco, sparkling water",
                "en": "Homemade limoncello, Prosecco, sparkling water"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Martini",
            "en": "Martini",
            "latin": true
          },
          "items": [
            {
              "name": {
                "tr": "Dry Martini",
                "en": "Dry Martini"
              },
              "desc": {
                "tr": "Tanqueray Gin, dry vermouth",
                "en": "Tanqueray Gin, dry vermouth"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Espresso Martini",
                "en": "Espresso Martini"
              },
              "desc": {
                "tr": "Absolut Vodka, Kahlúa, espresso",
                "en": "Absolut Vodka, Kahlúa, espresso"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Porn Star Martini",
                "en": "Porn Star Martini"
              },
              "desc": {
                "tr": "Absolut Vanilia, Passoã, passion fruit, lime juice, Prosecco — Prosecco yanında servis edilir.",
                "en": "Absolut Vanilia, Passoã, passion fruit, lime juice, Prosecco — Prosecco served on the side."
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "James Bond Martini",
                "en": "James Bond Martini"
              },
              "desc": {
                "tr": "Beefeater Gin, Absolut Vodka, Lillet Blanc — Çalkalanmış, karıştırılmamış.",
                "en": "Beefeater Gin, Absolut Vodka, Lillet Blanc — Shaken, not stirred."
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "French Martini",
                "en": "French Martini"
              },
              "desc": {
                "tr": "Raspberry Absolut Vodka, Chambord, pineapple juice, mixed berries, lime",
                "en": "Raspberry Absolut Vodka, Chambord, pineapple juice, mixed berries, lime"
              },
              "price": "700",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "bira",
      "navLabel": {
        "tr": "Bira",
        "en": "Beer"
      },
      "label": {
        "tr": "Biralar",
        "en": "Beers"
      },
      "groups": [
        {
          "label": {
            "tr": "Şişe Bira",
            "en": "Bottled Beer"
          },
          "items": [
            {
              "name": {
                "tr": "Efes Pilsen Malt / 50 cl",
                "en": "Efes Pilsen Malt / 50 cl"
              },
              "price": "295",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Efes Pilsen Özel Seri / 50 cl",
                "en": "Efes Pilsen Özel Seri / 50 cl"
              },
              "price": "295",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Efes Pilsen Glutensiz / 50 cl",
                "en": "Efes Pilsen Gluten-Free / 50 cl"
              },
              "price": "395"
            },
            {
              "name": {
                "tr": "Bomonti Filtresiz / 50 cl",
                "en": "Bomonti Filtresiz / 50 cl"
              },
              "price": "325",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Miller / 33 cl",
                "en": "Miller / 33 cl"
              },
              "price": "345",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Corona / 35,5 cl",
                "en": "Corona / 35,5 cl"
              },
              "price": "395",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Leffe Blonde / 33 cl",
                "en": "Leffe Blonde / 33 cl"
              },
              "price": "445",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Stella Artois / 44 cl",
                "en": "Stella Artois / 44 cl"
              },
              "price": "375",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "1664 Blanc / 33 cl",
                "en": "1664 Blanc / 33 cl"
              },
              "price": "385",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Weihenstephaner / 33 cl",
                "en": "Weihenstephaner / 33 cl"
              },
              "price": "445",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Peja Alkolsüz / 33 cl",
                "en": "Peja Non-Alcoholic / 33 cl"
              },
              "price": "250",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Cider · Elma & Çilek",
                "en": "Cider · Apple & Strawberry"
              },
              "price": "495",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Fıçı Bira",
            "en": "Draft Beer"
          },
          "items": [
            {
              "name": {
                "tr": "Efes Pilsen",
                "en": "Efes Pilsen"
              },
              "prices": [
                {
                  "label": {
                    "tr": "33 cl",
                    "en": "33 cl"
                  },
                  "value": "225"
                },
                {
                  "label": {
                    "tr": "50 cl",
                    "en": "50 cl"
                  },
                  "value": "255"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Beck’s",
                "en": "Beck’s"
              },
              "prices": [
                {
                  "label": {
                    "tr": "33 cl",
                    "en": "33 cl"
                  },
                  "value": "255"
                },
                {
                  "label": {
                    "tr": "50 cl",
                    "en": "50 cl"
                  },
                  "value": "285"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Bud",
                "en": "Bud"
              },
              "prices": [
                {
                  "label": {
                    "tr": "33 cl",
                    "en": "33 cl"
                  },
                  "value": "255"
                },
                {
                  "label": {
                    "tr": "50 cl",
                    "en": "50 cl"
                  },
                  "value": "285"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "raki",
      "navLabel": {
        "tr": "Rakı",
        "en": "Rakı"
      },
      "label": {
        "tr": "Rakı",
        "en": "Rakı"
      },
      "groups": [
        {
          "label": {
            "tr": "Rakı",
            "en": "Rakı"
          },
          "items": [
            {
              "name": {
                "tr": "Yeni Rakı Yeni Seri",
                "en": "Yeni Rakı Yeni Seri"
              },
              "prices": [
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "1450"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "2650"
                },
                {
                  "label": {
                    "tr": "Tek",
                    "en": "Single"
                  },
                  "value": "250"
                },
                {
                  "label": {
                    "tr": "Duble",
                    "en": "Double"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Beylerbeyi Göbek",
                "en": "Beylerbeyi Göbek"
              },
              "prices": [
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "1750"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "2950"
                },
                {
                  "label": {
                    "tr": "Tek",
                    "en": "Single"
                  },
                  "value": "300"
                },
                {
                  "label": {
                    "tr": "Duble",
                    "en": "Double"
                  },
                  "value": "500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Tekirdağ Altın Seri",
                "en": "Tekirdağ Altın Seri"
              },
              "prices": [
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "1650"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "2850"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Efe Gold",
                "en": "Efe Gold"
              },
              "prices": [
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "1550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "2750"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Sarı Zeybek",
                "en": "Sarı Zeybek"
              },
              "prices": [
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "3500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "distile",
      "navLabel": {
        "tr": "İçki",
        "en": "Spirits"
      },
      "label": {
        "tr": "Distileler",
        "en": "Spirits"
      },
      "groups": [
        {
          "label": {
            "tr": "Votka",
            "en": "Vodka"
          },
          "items": [
            {
              "name": {
                "tr": "Absolut Blue / Sweden",
                "en": "Absolut Blue / Sweden"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "3250"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Absolut Elyx / Sweden",
                "en": "Absolut Elyx / Sweden"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "850"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Absolut Vanilia /Sweden",
                "en": "Absolut Vanilia /Sweden"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Absolut Raspberri /Sweden",
                "en": "Absolut Raspberri /Sweden"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Smirnoff North / Russia",
                "en": "Smirnoff North / Russia"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Belvedere Organic / Poland",
                "en": "Belvedere Organic / Poland"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "900"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Grey Goose / France",
                "en": "Grey Goose / France"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "700"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Ketel One / Netherlands",
                "en": "Ketel One / Netherlands"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Beluga Noble / Russia",
                "en": "Beluga Noble / Russia"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "900"
                },
                {
                  "label": {
                    "tr": "100 cl",
                    "en": "100 cl"
                  },
                  "value": "11000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Haku / Japan",
                "en": "Haku / Japan"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "900"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10800"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Cin",
            "en": "Gin"
          },
          "items": [
            {
              "name": {
                "tr": "Beefeater",
                "en": "Beefeater"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "3250"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Beefeater Pink",
                "en": "Beefeater Pink"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Malfy Gin Rosa",
                "en": "Malfy Gin Rosa"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Malfy Originale",
                "en": "Malfy Originale"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Tanqueray London Dry",
                "en": "Tanqueray London Dry"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Tanqueray No. 10",
                "en": "Tanqueray No. 10"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "650"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Bombay Sapphire",
                "en": "Bombay Sapphire"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Gin Mare",
                "en": "Gin Mare"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "800"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Monkey 47 Dry Gin",
                "en": "Monkey 47 Dry Gin"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "750"
                },
                {
                  "label": {
                    "tr": "50 cl",
                    "en": "50 cl"
                  },
                  "value": "7000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Monkey 47 Sloe Gin",
                "en": "Monkey 47 Sloe Gin"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "750"
                },
                {
                  "label": {
                    "tr": "50 cl",
                    "en": "50 cl"
                  },
                  "value": "7000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Hendrick's",
                "en": "Hendrick's"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "800"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Roku",
                "en": "Roku"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "900"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10800"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Viski · Amerikan Viskileri",
            "en": "Whisky · American Whiskey"
          },
          "items": [
            {
              "name": {
                "tr": "Jack Daniel’s",
                "en": "Jack Daniel’s"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "3500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Jim Beam",
                "en": "Jim Beam"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Bulleit Bourbon",
                "en": "Bulleit Bourbon"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Gentleman Jack",
                "en": "Gentleman Jack"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Woodford Reserve",
                "en": "Woodford Reserve"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "700"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Viski · Harman İskoç Viskileri",
            "en": "Whisky · Blended Scotch"
          },
          "items": [
            {
              "name": {
                "tr": "Ballantine’s 10 YO",
                "en": "Ballantine’s 10 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Chivas Regal 12 YO",
                "en": "Chivas Regal 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "3500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Chivas Regal 18 YO",
                "en": "Chivas Regal 18 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "875"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Monkey Shoulder",
                "en": "Monkey Shoulder"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Johnnie Walker Red Label",
                "en": "Johnnie Walker Red Label"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Johnnie Walker Black Label",
                "en": "Johnnie Walker Black Label"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "575"
                },
                {
                  "label": {
                    "tr": "35 cl",
                    "en": "35 cl"
                  },
                  "value": "3750"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6750"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Johnnie Walker Double Black Label",
                "en": "Johnnie Walker Double Black Label"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "650"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Johnnie Walker Blue Label",
                "en": "Johnnie Walker Blue Label"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "2500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "30000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Royal Salute 21 YO",
                "en": "Royal Salute 21 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "25000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "The Macallan 12 YO",
                "en": "The Macallan 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "900"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10750"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "The Macallan 18 YO",
                "en": "The Macallan 18 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "37500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Chivas Regal 25 YO",
                "en": "Chivas Regal 25 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "42500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Viski · Tek Malt Viskiler",
            "en": "Whisky · Single Malts"
          },
          "items": [
            {
              "name": {
                "tr": "Aberlour 12 YO",
                "en": "Aberlour 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "750"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Glenlivet 12 YO",
                "en": "Glenlivet 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "725"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Glenfiddich 12 YO",
                "en": "Glenfiddich 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "875"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Singleton 12 YO",
                "en": "Singleton 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Ardberg 10 YO",
                "en": "Ardberg 10 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "900"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Lagavulin 8 YO",
                "en": "Lagavulin 8 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "750"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Glenkinchie 12 YO",
                "en": "Glenkinchie 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "750"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8750"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Glenmorangie Original 12 YO",
                "en": "Glenmorangie Original 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "700"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Oban 14 YO",
                "en": "Oban 14 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "800"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Dalmore 12 YO",
                "en": "Dalmore 12 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "950"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "11250"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Talisker 10 YO",
                "en": "Talisker 10 YO"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "750"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Viski · İrlanda Viskileri",
            "en": "Whisky · Irish Whiskey"
          },
          "items": [
            {
              "name": {
                "tr": "Jameson",
                "en": "Jameson"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Jameson Black Barrel",
                "en": "Jameson Black Barrel"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6500"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Viski · Japon Viskileri",
            "en": "Whisky · Japanese Whiskey"
          },
          "items": [
            {
              "name": {
                "tr": "Hibiki",
                "en": "Hibiki"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "2000"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "20000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Fuyu",
                "en": "Fuyu"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "875"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "10000"
                }
              ],
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Tekila & Mezcal",
            "en": "Tequila & Mezcal"
          },
          "items": [
            {
              "name": {
                "tr": "Olmeca Silver",
                "en": "Olmeca Silver"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "300"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "5000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Olmeca Gold",
                "en": "Olmeca Gold"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "350"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "5500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Casamigos Blanco",
                "en": "Casamigos Blanco"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "450"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Casamigos Reposado",
                "en": "Casamigos Reposado"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "450"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8750"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Casamigos Mezcal",
                "en": "Casamigos Mezcal"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "450"
                },
                {
                  "label": {
                    "tr": "100 cl",
                    "en": "100 cl"
                  },
                  "value": "10000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Ojo De Tigre Joven Mezcal",
                "en": "Ojo De Tigre Joven Mezcal"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "450"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Don Julio Silver",
                "en": "Don Julio Silver"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8750"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Don Julio 1942 Añejo",
                "en": "Don Julio 1942 Añejo"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "1850"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "27500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Patrón Silver",
                "en": "Patrón Silver"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Patrón XO Café",
                "en": "Patrón XO Café"
              },
              "prices": [
                {
                  "label": {
                    "tr": "3 cl",
                    "en": "3 cl"
                  },
                  "value": "550"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Rom",
            "en": "Rum"
          },
          "items": [
            {
              "name": {
                "tr": "Havana Club 3 Años",
                "en": "Havana Club 3 Años"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Havana Club 7 Años",
                "en": "Havana Club 7 Años"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Bumbu Original",
                "en": "Bumbu Original"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "625"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Captain Morgan Spiced Gold",
                "en": "Captain Morgan Spiced Gold"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "6000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Zacapa 23",
                "en": "Zacapa 23"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "650"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Diplomático Reserva Exclusiva",
                "en": "Diplomático Reserva Exclusiva"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "725"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Konyak & Brandy",
            "en": "Cognac & Brandy"
          },
          "items": [
            {
              "name": {
                "tr": "Rémy Martin VSOP",
                "en": "Rémy Martin VSOP"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "675"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "8000"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Hennessy VS",
                "en": "Hennessy VS"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "600"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "7250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Hennessy VSOP",
                "en": "Hennessy VSOP"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "800"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9250"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Courvoisier VSOP",
                "en": "Courvoisier VSOP"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "700"
                },
                {
                  "label": {
                    "tr": "70 cl",
                    "en": "70 cl"
                  },
                  "value": "9750"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Likörler",
            "en": "Liqueurs"
          },
          "items": [
            {
              "name": {
                "tr": "Aperol",
                "en": "Aperol"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Archers",
                "en": "Archers"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Baileys",
                "en": "Baileys"
              },
              "prices": [
                {
                  "label": {
                    "tr": "10 cl",
                    "en": "10 cl"
                  },
                  "value": "550"
                }
              ],
              "allergens": {
                "tr": "Süt ve Süt Ürünleri",
                "en": "Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Malibu",
                "en": "Malibu"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "350"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Kahlúa",
                "en": "Kahlúa"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "350"
                }
              ]
            },
            {
              "name": {
                "tr": "Campari",
                "en": "Campari"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "450"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Cardinal Melon",
                "en": "Cardinal Melon"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Chambord",
                "en": "Chambord"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Cachaça",
                "en": "Cachaça"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Amaretto Disaronno",
                "en": "Amaretto Disaronno"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "450"
                }
              ],
              "allergens": {
                "tr": "Kabuklu Kuruyemişler",
                "en": "Tree Nuts"
              }
            },
            {
              "name": {
                "tr": "Southern Comfort",
                "en": "Southern Comfort"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Gluten, Kabuklu Kuruyemişler, Sülfit",
                "en": "Gluten, Tree Nuts, Sulphites"
              }
            },
            {
              "name": {
                "tr": "Skinos",
                "en": "Skinos"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "500"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Safari",
                "en": "Safari"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Passoã",
                "en": "Passoã"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "400"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Lillet Blanc",
                "en": "Lillet Blanc"
              },
              "prices": [
                {
                  "label": {
                    "tr": "10 cl",
                    "en": "10 cl"
                  },
                  "value": "475"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Cointreau",
                "en": "Cointreau"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "550"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "St-Germain",
                "en": "St-Germain"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "700"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Vermut",
            "en": "Vermouth"
          },
          "items": [
            {
              "name": {
                "tr": "Martini Bianco",
                "en": "Martini Bianco"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "450"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Martini Rosso",
                "en": "Martini Rosso"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "450"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Martini Extra Dry",
                "en": "Martini Extra Dry"
              },
              "prices": [
                {
                  "label": {
                    "tr": "5 cl",
                    "en": "5 cl"
                  },
                  "value": "450"
                }
              ],
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            }
          ]
        },
        {
          "label": {
            "tr": "Shotlar",
            "en": "Shots"
          },
          "items": [
            {
              "name": {
                "tr": "Jägermeister",
                "en": "Jägermeister"
              },
              "price": "300",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "Jägermeister Orange",
                "en": "Jägermeister Orange"
              },
              "price": "300"
            },
            {
              "name": {
                "tr": "Limoncello",
                "en": "Limoncello"
              },
              "price": "300",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Sambuca",
                "en": "Sambuca"
              },
              "price": "300",
              "allergens": {
                "tr": "Sülfit",
                "en": "Sulphites"
              }
            },
            {
              "name": {
                "tr": "Fernet-Branca",
                "en": "Fernet-Branca"
              },
              "price": "300",
              "allergens": {
                "tr": "Süt ve Süt Ürünleri",
                "en": "Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "Grappa",
                "en": "Grappa"
              },
              "price": "300",
              "allergens": {
                "tr": "Gluten",
                "en": "Gluten"
              }
            },
            {
              "name": {
                "tr": "B52",
                "en": "B52"
              },
              "price": "300",
              "allergens": {
                "tr": "Gluten, Süt ve Süt Ürünleri",
                "en": "Gluten, Milk and Dairy Products"
              }
            },
            {
              "name": {
                "tr": "5 Espresso Martini Shots",
                "en": "5 Espresso Martini Shots"
              },
              "price": "750",
              "allergens": {
                "tr": "Sülfit, Kafein",
                "en": "Sulphites, Caffeine"
              }
            },
            {
              "name": {
                "tr": "5 Jägermeister Shots",
                "en": "5 Jägermeister Shots"
              },
              "price": "1250"
            }
          ]
        }
      ]
    }
  ]
};
