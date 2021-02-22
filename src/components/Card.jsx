import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import iconCodeMapping from '../WeatherIcon';

const Card = ({
  onClick,
  forecastList,
  isSelected,
  unit
}) => {
  if ( forecastList !== undefined && forecastList.length > 0 ) {
    const first = forecastList[0];

    const tempMaxAndMin = forecastList.reduce(
      ( acc, current ) => {
        if ( current.temp_max > acc.max ) {
          acc.max = current.temp_max;
        }
        
        if ( current.temp_min < acc.min ) {
          acc.min = current.temp_min;
        }
        
        return acc;
      },
      {
        max: Number.MIN_VALUE,
        min: Number.MAX_VALUE
      }
    );
    
    return (
      <Root>
        <Container
          onClick={ onClick }
          isselected={ isSelected.toString() }
          className="weather-card">
          <Text>
            { moment.unix( first.dt ).format( 'dddd' ) }
          </Text>
          
          <Icon
            src={ iconCodeMapping[first.icon] }
            alt="" />
          
          <Text>
            { Math.round( tempMaxAndMin.max * 10 ) / 10 }
            &deg;
            { unit === 'metric' ? 'C' : 'F' }
          </Text>
          
          <Text>
            { Math.round( tempMaxAndMin.min * 10 ) / 10 }
            &deg;
            { unit === 'metric' ? 'C' : 'F' }
          </Text>
        </Container>
      </Root>
    );
  }
  
  return <div />;
};

const Root = styled.div`
  min-width: 20%;
`;

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  background: ${(props) => (props.isSelected ? '#F9F9F9' : 'inherit')};
  border: ${(props) => (props.isSelected ? '1px solid #DDDDDD' : 'none')};
`;

const Text = styled.div`
  text-align: center;
  line-height: normal;
  padding: 0.5rem 0rem;
`;

const Icon = styled.img`
  align-self: center;
  line-height: normal;
  width: 3rem;
  height: 3rem;
`;


export default Card;
