import json
import csv
import math

def flatten_list(_2d_list):
    flat_list = []
    # Iterate through the outer list
    for element in _2d_list:
        if type(element) is list:
            # If the element is of type list, iterate through the sublist
            for item in element:
                flat_list.append(item)
        else:
            flat_list.append(element)
    return flat_list

with open('custom_stamps.json') as f:
    data = json.load(f)
with open('standard_stamps.json') as f:
    data.append(json.load(f))
with open('replacement_pads.json') as f:
    data.append(json.load(f))

data = flatten_list(data)

elements = [x for x in data[0].keys()]
print("Attributes : ", elements)

brands = set([x['brand'] for x in data])
brands = [[x] for x in brands if x != None and x != 'unknown']

dimensions = [tuple(x.get('dimensions'))
	if x.get('dimensions')[0] != None
	else tuple([None, None])
	for x in data if x.get('dimensions') != None]
dimensions = list(set(dimensions))

tags = set(flatten_list([x.get('tags') for x in data if x != None]))
tags = [[x] for x in tags if x != None and x not in [str(x) for x in range(1,13)]]


items = [[
	x['brand'] if x['brand'] != 'unknown' else None,
	x.get('ref'),
	x['title'],
	x['image'],
	str(math.ceil(float(x['price']) * 6 / 10) * 10),
	x.get('number_lines'),
	x.get('dimensions') if x.get('dimensions') != None and x.get('dimensions')[0] != None and x.get('dimensions')[0] != x.get('dimensions')[1] else None,
	0,
	False
	] for x in data if x.get('ref') != None and x.get('brand') not in [None, '='] and x.get('title') != None]

with open('CatalogBrands.csv', 'w') as f:
	write = csv.writer(f)
	write.writerow(['CatalogBrand'])
	write.writerows(brands)
	write.writerow(['Shiny'])
	write.writerow(['Autre'])

with open('CatalogTags.csv', 'w') as f:
	write = csv.writer(f)
	write.writerow(['CatalogTags'])
	write.writerows(tags)

with open('CatalogDimensions.csv', 'w') as f:
	write = csv.writer(f)
	write.writerow(['Width', 'Height'])
	write.writerows(dimensions)

with open('CatalogItems.csv', 'w') as f:
	write = csv.writer(f)
	write.writerow(['Brand', 'Name' ,'Description', 'Picture', 'Price', 'NbLines', 'Dimensions', 'availablestock', 'onreorder'])
	write.writerows(items)

with open('CatalogItems.csv', 'r') as f:
	csv_reader = csv.reader(f, delimiter=',')
	#print([x for x in csv_reader])
