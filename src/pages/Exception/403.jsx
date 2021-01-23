import React from 'react';
import { Link, useIntl } from 'umi';
import Exception from '@/components/Exception';

const Exception403 = () => {
  const { formatMessage } = useIntl();
  return (
    <Exception
      type="403"
      desc={formatMessage({ id: 'app.exception.description.403' })}
      linkElement={Link}
      backText={formatMessage({ id: 'app.exception.back' })}
    />
  )
};

export default Exception403;
