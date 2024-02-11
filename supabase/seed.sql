INSERT INTO
	pricing (
		"slug",
		"title",
		"description",
		"termsUrl",
		"currency",
		"theme",
		"isDefault",
		"metadata",
		"billingOptions",
		"tiers"
	)
VALUES
	(
		'sample-pricing',
		'Sample Pricing',
		'Create and test multiple strategies to unlock the most optimal pricing for your SaaS startup',
		'https://saasi.vercel.app/terms',
		'USD',
		'dim',
		true,
		NULL,
		'{
			"show": true,
			"selected": "month",
			"labels": 
				{
					"week": "Weekly",
					"month": "Monthly",
					"year": "Yearly (17% off)"
				}
		}',
		array [
			'{
				"id": 0,
				"title": "Basic",
				"badge": "",
				"description": "For small teams or office",
				"price": [
					{
						"value": 9.99,
						"billingCycle": 1,
						"billingPeriod": "month"
					},
					{
						"value": 99,
						"billingCycle": 1,
						"billingPeriod": "year"
					}
				],
				"priceType": "recurring",
				"features": [
					{
						"id": 0,
						"name": "2 team members",
						"included": true
					},
					{
						"id": 1,
						"name": "20GB Cloud storage",
						"included": true
					},
					{
						"id": 2,
						"name": "Integration help",
						"included": true
					},
					{
						"id": 3,
						"name": "Sketch Files",
						"included": false
					},
					{
						"id": 4,
						"name": "API Access",
						"included": false
					},
					{
						"id": 5,
						"name": "Complete documentation",
						"included": false
					},
					{
						"id": 6,
						"name": "24×7 phone & email support",
						"included": false
					}
				],
				"terms": "- No lock-in contracts<br />- Your subscription will auto-renew at the end of the billing cycle<br />- Cancel anytime<br />",
				"buttons": [
					{
						"type": "link",
						"name": "Choose plan",
						"href": "/#"
					}
			]}'::jsonb,
			'{ 
				"id": 1,
				"title": "Pro",
				"badge": "Popular",
				"description": "For professional teams",
				"price": [
					{
						"value": 19,
						"billingCycle": 1,
						"billingPeriod": "month"
					},
					{
						"value": 199,
						"billingCycle": 1,
						"billingPeriod": "year"
					}
				],
				"priceType": "recurring",
				"features": [
					{
						"id": 0,
						"name": "2 team members",
						"included": true
					},
					{
						"id": 1,
						"name": "20GB Cloud storage",
						"included": true
					},
					{
						"id": 2,
						"name": "Integration help",
						"included": true
					},
					{
						"id": 3,
						"name": "Sketch Files",
						"included": true
					},
					{
						"id": 4,
						"name": "API Access",
						"included": true
					},
					{
						"id": 5,
						"name": "Complete documentation",
						"included": false
					},
					{
						"id": 6,
						"name": "24×7 phone & email support",
						"included": false
					}
				],
				"terms": "- No lock-in contracts<br />- Your subscription will auto-renew at the end of the billing cycle<br />- Cancel anytime<br />",
				"buttons": [
					{
						"type": "link",
						"name": "Choose plan",
						"href": "/#"
					}
			]}'::jsonb,
			'{ 
				"id": 2,
				"title": "Enterprise",
				"badge": "",
				"description": "For enterprise business",
				"price": "Contact us",
				"priceType": "plain text",
				"showPriceAsText": true,
				"features": [
					{
						"id": 0,
						"name": "2 team members",
						"included": true
					},
					{
						"id": 1,
						"name": "20GB Cloud storage",
						"included": true
					},
					{
						"id": 2,
						"name": "Integration help",
						"included": true
					},
					{
						"id": 3,
						"name": "Sketch Files",
						"included": true
					},
					{
						"id": 4,
						"name": "API Access",
						"included": true
					},
					{
						"id": 5,
						"name": "Complete documentation",
						"included": true
					},
					{
						"id": 6,
						"name": "24×7 phone & email support",
						"included": true
					}
				],
				"terms": "",
				"buttons": [
					{
						"type": "link",
						"name": "Choose plan",
						"href": "/#"
					}
			]}'::jsonb 
		]
	);