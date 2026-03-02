import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Sube a 20 usuarios en 30 segundos
    { duration: '1m', target: 20 },  // Mantiene 20 usuarios por 1 minuto
    { duration: '30s', target: 0 },  // Baja a 0 usuarios
  ],
};

export default function () {
  // Vista 1: Endpoint raíz (ejemplo)
  const res1 = http.get('https://github.com/vanessa606/fast-api-dev/blob/main/');
  check(res1, { 'status was 200': (r) => r.status === 200 });
  sleep(1);

  // Vista 2: Endpoint de datos (ajusta la ruta según tu app)
  const res2 = http.get('https://github.com/vanessa606/fast-api-dev/blob/main');
  check(res2, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
