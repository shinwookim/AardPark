from setuptools import setup

setup(
    name="aardpark",
    packages=["aardpark"],
    include_package_data=True,
    install_requires=["flask", "flask_cors", "flask_sqlalchemy"],
)
