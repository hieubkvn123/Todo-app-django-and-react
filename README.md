# Todo-app-django-and-react
A todo list app built with Django and React. My first experience with Django and React

## Run using gunicorn
```
python3 -m gunicorn todo.wsgi --bind 0.0.0.0:8000
```

## Build docker image
```
docker build -t todo_app .
docker run -p <your_port>:8000 -i -t todo_app
```

## Testing account 
	- username : hieubkvn123
	- password : ahihi
