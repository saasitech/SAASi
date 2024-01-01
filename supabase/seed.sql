INSERT INTO
	pricing (
		slug,
		title,
		description,
		currency,
		theme,
		show_billing_cycle,
		settings,
		tiers
	)
VALUES
	(
		'test_pricing',
		'Test Pricing',
		'Sample',
		'USD',
		'dim',
		false,
		NULL,
		'{"{\"id\":1,\"title\":\"Basic\",\"badge\":\"\",\"description\":\"For small teams or office\",\"price\":[{\"value\":19.99,\"billingCycle\":1,\"billingPeriod\":\"month\"},{\"value\":199,\"billingCycle\":1,\"billingPeriod\":\"year\"}],\"priceType\":\"recurring\",\"features\":[{\"name\":\"2 team members\",\"included\":true},{\"name\":\"20GB Cloud storage\",\"included\":true},{\"name\":\"Integration help\",\"included\":true},{\"name\":\"Sketch Files\",\"included\":false},{\"name\":\"API Access\",\"included\":false},{\"name\":\"Complete documentation\",\"included\":false},{\"name\":\"24×7 phone & email support\",\"included\":false}],\"buttons\":[{\"type\":\"link\",\"name\":\"Choose plan\",\"href\":\"/#\"}]}","{\"id\":2,\"title\":\"Pro\",\"badge\":\"Popular\",\"description\":\"For professional teams\",\"price\":[{\"value\":19,\"billingCycle\":1,\"billingPeriod\":\"month\"},{\"value\":199,\"billingCycle\":1,\"billingPeriod\":\"year\"}],\"priceType\":\"recurring\",\"features\":[{\"name\":\"2 team members\",\"included\":true},{\"name\":\"20GB Cloud storage\",\"included\":true},{\"name\":\"Integration help\",\"included\":true},{\"name\":\"Sketch Files\",\"included\":true},{\"name\":\"API Access\",\"included\":true},{\"name\":\"Complete documentation\",\"included\":false},{\"name\":\"24×7 phone & email support\",\"included\":false}],\"buttons\":[{\"type\":\"link\",\"name\":\"Choose plan\",\"href\":\"/#\"}]}","{\"id\":3,\"title\":\"Enterprise\",\"badge\":\"\",\"description\":\"For enterprise business\",\"price\":\"Contact us\",\"priceType\":\"plain text\",\"showPriceAsText\":true,\"features\":[{\"name\":\"2 team members\",\"included\":true},{\"name\":\"20GB Cloud storage\",\"included\":true},{\"name\":\"Integration help\",\"included\":true},{\"name\":\"Sketch Files\",\"included\":true},{\"name\":\"API Access\",\"included\":true},{\"name\":\"Complete documentation\",\"included\":true},{\"name\":\"24×7 phone & email support\",\"included\":true}],\"buttons\":[{\"type\":\"link\",\"name\":\"Choose plan\",\"href\":\"/#\"}]}"}'
	);