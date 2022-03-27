import React from 'react';
import { Link, useIntl } from 'umi';
import Exception from '@/components/Exception';

const Exception500 = () => {
  const { formatMessage } = useIntl();
  return (
    <Exception
      type="500"
      desc={formatMessage({ id: 'app.exception.description.500' })}
      linkElement={Link}
      backText={formatMessage({ id: 'app.exception.back' })}
    />
  );
};

export default Exception500;
