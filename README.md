# AardPark
> To build a world where parking is accessible to everyone, everywhere.

AardPark is a web application that allows users to find parking spots in their area. Users can search for parking spots by location, price, and availability. Lot owners can list their parking spots on the platform and set their own prices. They can also reserve parking spots in advance. AardPark is a platform that connects drivers with parking spot owners.



## Tech Stack
- **Client:** Angular, TypeScript, [Auth0](https://auth0.com/), [Google APIs](https://developers.google.com/apis-explorer)
- **Server:** Python, FastAPI, [MongoDB](https://www.mongodb.com/)


## Run Locally
Clone the project
```bash
git clone https://github.com/shinwookim/AardPark
```
Go to the project directory
```bash
cd AardPark
```

## Start Backend

```bash
cd ./backend
# Provide MongoDB credentials in .env file (see `template.env` for reference)
pip install -r requirements.txt
fastapi run main.py
```




## Contributors
Minhal Khan: mik172@pitt.edu

Shinwoo Kim: shinwookim@pitt.edu

Todd Kocher: tok33@pitt.edu

Maanya Shanker: maanya.shanker@pitt.edu
