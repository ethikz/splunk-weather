import React, {
  useState
} from 'react';
import moment from 'moment';
import styled from 'styled-components';

import BannerTab from './BannerTab';
import Card from './Card';

const Weather = ({
  location,
  forecast,
  unit
}) => {
  const [
    forecastIdx,
    setForecastIdx
  ] = useState( 0 );

  if ( forecast !== undefined && forecast.length > 0 ) {
    let firstMomentOfDay;
    let forecastOfDay = [];
    
    const forecastOfDayList = [];
    
    /* eslint-disable no-param-reassign */
    forecast.forEach( ( item, index) => {
      if ( firstMomentOfDay === undefined ) {
        firstMomentOfDay = moment.unix( item.dt );
        forecast[index].moment = firstMomentOfDay;
        forecastOfDay.push( item );
      } else {
        const currentMoment = moment.unix( item.dt );
        
        forecast[index].moment = currentMoment;
        
        if ( firstMomentOfDay.isSame( currentMoment, 'day' ) ) {
          forecastOfDay.push( item );
        } else {
          forecastOfDayList.push( forecastOfDay );
          forecastOfDay = [];
          forecastOfDay.push( item );
          firstMomentOfDay = currentMoment;
        }
      }
    });
    
    const forecastList = forecastOfDayList;

    return (
      <ContentContainer>
        <BannerTab
          forecastOfDay={ forecastList[forecastIdx] }
          location={ location }
          unit={ unit }
          className=""
        />
        <Next5Container>
          <Card
            onClick={ () => setForecastIdx( 0 ) }
            forecastList={ forecastList[0] }
            isSelected={ forecastIdx === 0 }
            unit={ unit }
          />
          <Card
            onClick={ () => setForecastIdx( 1 ) }
            forecastList={ forecastList[1] }
            isSelected={ forecastIdx === 1 }
            unit={ unit }
          />
          <Card
            onClick={ () => setForecastIdx( 2 ) }
            forecastList={ forecastList[2] }
            isSelected={ forecastIdx === 2 }
            unit={ unit }
          />
          <Card
            onClick={ () => setForecastIdx( 3 ) }
            forecastList={ forecastList[3] }
            isSelected={ forecastIdx === 3 }
            unit={ unit }
          />
          <Card
            onClick={ () => setForecastIdx( 4 ) }
            forecastList={ forecastList[4] }
            isSelected={ forecastIdx === 4 }
            unit={ unit }
          />
        </Next5Container>
      </ContentContainer>
    );
  }

  return (
    <>
      <h3>No forecast data available!</h3>
    </>
  );
};

const ContentContainer = styled.div`
  display: block;
  margin: 10px 5px;
  text-align: left;
  border: 1px solid #dddddd;
  box-shadow: 3px 3px 3px #aaaaaa;
  padding: 1rem 1rem;
`;

const Next5Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: space-around;
`;

export default Weather;
