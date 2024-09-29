import requests
from functools import lru_cache


class Auth0:
    def __init__(self, api: str):
        self.api = api

    @lru_cache
    def get_user_info_from_token(self, token: str) -> str:
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        response = requests.get(f"{self.api}/userinfo", headers=headers)
        return response.json()

    def get_user_email_from_token(self, token: str) -> str:
        """
        Get the email address of the user from the token.
        """
        user_info = self.get_user_info_from_token(token)
        return user_info["email"]

    def get_user_name_from_token(self, token: str) -> str:
        """
        Get the name of the user from the token.
        """
        user_info = self.get_user_info_from_token(token)
        return f"{user_info['given_name']} {user_info['family_name']}"
