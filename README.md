# Grocify

A webapp for preparing a grocery list.

# Set up

1. Download and install [Docker desktop](https://www.docker.com/products/docker-desktop/)
2. Clone this GitHub repository.
3. Navigate to `scripts` folder.
4. Run `./build_image.sh` to build docker images locally.

# Workflow

## Launching

### Scripts

- `./launch_backend.sh` to launch just Django backend.
- `./launch_frontend.sh` to launch just React frontend.
- `./launch_server.sh` to launch both the backend and the frontend together.

## Updating

### Backend

If you installed new packages to the backend, or recently pulled new updates from GitHub repository, then update the `requirements.txt` file and run `build_image.sh` script.

### Frontend

If you installed new packages to the frontend, or recently pulled new updates from GitHub repository, then run `build_image.sh` script.
