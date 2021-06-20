### Localhost setup

Install Python packages:

    pip install -r requirements.txt

If you get an error regarding the `psycopg2`, remove it temporarily from the `requirements.txt` file, then run the 
`pip install ...` command again and then return `psycopg2` back into the `requirements.txt` file.

> The `psycopg2` is only needed on Heroku, where installation goes through without any problem.

### Commands for Heroku deployment (for existing Heroku app)

1. Heroku login: `heroku login`
2. Make sure the Git repo is initialized (`git init`) and the files commited (`git add .` and `git commit -m "message"`)
3. Add Heroku remote URL: `heroku git:remote -a enter-heroku-app-name-here`
4. Push to Heroku: `git push heroku master` (if it doesn work, try to force it: `git push heroku master --force`)

#### Heroku Add-Ons Needed

- Heroku Postgres
- Adminium
- Heroku Redis
