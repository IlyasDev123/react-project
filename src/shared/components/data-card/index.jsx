// DataCards.js
import Card from '../card';
import { Link } from 'react-router-dom';
import Loader from 'shared/components/loader';

import PropTypes from 'prop-types';

const DataCards = ({ data, customClass, isLoader }) => {
  return (
    <div className={`${customClass}`}>
      {Object.keys(data).map((key, index) => (
        <Card
          key={index}
          customClass="bg-white text-black-700 rounded min-h-32 w-64 flex flex-col justify-center items-center text-center"
          spacing="m-1"
        >
          {isLoader ? (
            <Loader />
          ) : (
            <>
              <h5 className="text-xl py-2 font-semibold">{`${data[key].title}`}</h5>
              <Link to={`${data[key].path}`}>
                <p className="text-2xl">{`${data[key].count}`}</p>
              </Link>
              {data[key].active > 0 && data[key]?.active && (
                <div className="flex gap-2 mt-2 mb-4">
                  <div>
                    <p className="text-l">
                      <span className="text-blue-700">Active </span>:{' '}
                      {`${data[key].active}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-l">
                      <span className="text-red-700"> Deactive </span>:{' '}
                      {`${data[key].inactive}`}
                    </p>
                  </div>
                </div>
              )}

              {data[key].premium > 0 && data[key]?.premium && (
                <div className="flex gap-2 mt-2 mb-4">
                  <div>
                    <p className="text-l">
                      <span className="text-green-700">Premium </span>:{' '}
                      {`${data[key].premium}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-l">
                      <span className="text-blue-700"> Free </span>:{' '}
                      {`${data[key].free}`}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      ))}
    </div>
  );
};

DataCards.propTypes = {
  data: PropTypes.object.isRequired,
  customClass: PropTypes.string,
  isLoader: PropTypes.bool,
};

export default DataCards;
