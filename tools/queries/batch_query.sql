DO
$do$
BEGIN 
   FOR i IN 1..1000 LOOP
		PERFORM * FROM public.test_gin where tags @> '{oligei, test}';
   END LOOP;
END
$do$;