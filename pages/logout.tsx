import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ApiClient from 'lib/api';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    ApiClient.destroyToken();
    window.location.href = '/';
  }, []);

  return (null);
}
