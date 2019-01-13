# T-Orders

Software for computing T-orders in constraint-based phonology

### Installation

```bash
git clone https://github.com/T-orders/T-orders
```

### Build & Launch

```bash
docker-compose up -d --build
```

To attach to the logs of all running services:
```bash
docker-compose logs -f -t
```

To attach to the logs of a single container:
```bash
docker logs -t -f <container-name>
```

This will expose the Flask application's endpoints on port `5001` as well as a flower server for monitoring workers on port `5555`

To add more workers:
```bash
docker-compose up -d --scale worker=5 --no-recreate
```

To shut down:

```bash
docker-compose down
```

If you would like to change the endpoints, update the code in [api/app.py](api/app.py)

Task changes should happen in [queue/tasks.py](celery-queue/tasks.py) 

---
