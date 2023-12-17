INSERT INTO feature (id,"name", "display_name") VALUES
    (1,'prototypes_3', '3 prototypes'),
    (2,'boards_3', '3 boards'),
    (3,'team_members_5', 'Up to 5 team members'),
    (4,'unlimited_prototypes', 'Unlimited prototypes'),
    (5,'unlimited_boards', 'Unlimited boards'),
    (6,'unlimited_team_members', 'Unlimited team members'),
    (7,'advanced_security', 'Advanced security'),
    (8,'permissions_workflows', 'Permissions & workflows');

INSERT INTO terms_summary (id,"name",terms) VALUES
	 (1,'1 month','{"\"Your minimum contract period is 1 month\"","\"After 1 month, your subscription will automatically renew month to month and your credit card will be processed at the monthly amount.\"","\"Upon completion of your minimum contract period, you may choose to suspend or discontinue your subscription by sending us a 30 day notice email to cancellations@example.com\""}'),
	 (2,'3 month ','{"\"Your minimum contract period is 3 month\"","\"After 4 months, your subscription will automatically renew month to month and your credit card will be processed at the monthly amount.\"","\"Upon completion of your minimum contract period, you may choose to suspend or discontinue your subscription by sending us a 30 day notice email to cancellations@example.com\""}'),
     (3,'1 year','{"\"Your minimum contract period is 12 months\"","\"After 1 month, your subscription will automatically renew month to month and your credit card will be processed at the monthly amount.\"","\"Upon completion of your minimum contract period, you may choose to suspend or discontinue your subscription by sending us a 30 day notice email to cancellations@example.com\""}');

INSERT INTO tier (slug,price,"name",auto_payment,trial,trial_text,description) VALUES
	 ('starter',15,'Starter',false,NULL,NULL,'Best for beginners'),
	 ('pro',25,'Professional',false,NULL,NULL,'Best for professionals'),
	 ('team',89,'Team',false,NULL,NULL,'For professional teams');
    
INSERT INTO tier__feature (tier_id,feature_id) VALUES
	 (1,1),
	 (1,2),
	 (2,4),
	 (2,5),
	 (3,4),
	 (3,5),
	 (3,3);

INSERT INTO billing_cycle_option (id, "cycle","name",discount,discount_type,discount_text) VALUES
	 (1, 1,'1 month',NULL,NULL,NULL),
	 (2, 6,'6 months',1,'extraCycles','1 extra month'),
	 (3, 12,'12 months',3,'extraCycles','3 extra month'),
     (4, 6,'6 months',10,'percent','10% discount'),
	 (5, 12,'12 months',30,'percent','30 % discount');

INSERT INTO pricing (slug,default_billing,discount_type,title,show_billing_options,style_id,settings,allow_trial) VALUES
	 ('1s6CdU',1,'extraCycles','Extra months',true,'default',NULL,false),
	 ('2baDwf',1,'percent','Discount',false,'default',NULL,false);

INSERT INTO public.pricing__tier__billing_cycle_option (billing_cycle_option_id,tier_id,pricing_id,terms_summary_id,applicable_discount) VALUES
	 (1,1,1,1,false),
	 (1,2,1,1,false),
	 (1,3,1,1,false),
	 (2,1,1,2,true),
	 (3,1,1,3,true),
	 (2,2,1,2,true),
	 (3,2,1,3,true),
	 (2,3,1,2,true),
	 (3,3,1,3,true),
	 (1,1,2,1,false),
	 (4,1,2,2,true),
	 (5,1,2,3,true),
	 (1,2,2,1,false),
	 (4,2,2,2,true),
	 (5,2,2,3,true),
	 (1,3,2,1,false),
	 (4,3,2,2,true),
	 (5,3,2,3,true);

