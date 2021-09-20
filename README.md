requirements:
visualstudiocode is to be installed


client folder has several folders

#components
It has header nav code which has options called signin,signup,signout,popular,latest,home
user can register through signin 
user can login through signup
when user logins signup and signin vanishes and only signout is visible on the header
clicking on popular displays popular movies
clicking on latest displays latest movies
home displays default movies

#functions
this folder has all required frontend apis to createorupdte user

#pages
it has signin page where user can signin through email&password which uses firebase authentication
it has signup page where user enters email for confirmation,once confirmation is done user is redirected to signupcomplete page where user sets password
it has signout page where user can logout through firebase authentication
home page renders all default movies using api https://api.themoviedb.org/3/trending/all/day
latest page renders all latest images using api https://api.themoviedb.org/3/movie/now_playing
popular page renders all popular images using api https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc

#reducers
it has userreducer where user can dispatch 2 actions namely LOGGED_IN and LOG_OUT


