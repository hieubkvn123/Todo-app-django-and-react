from django.shortcuts import render 

def index(request, resource):
	return render(request, "build/index.html")