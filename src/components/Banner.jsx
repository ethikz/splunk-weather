import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import iconCodeMapping from '../WeatherIcon';

const Banner = ({ forecastNow }) => (
  <>
    <h5>
      { `${moment.unix( forecastNow.dt ).format( 'dddd h:mm a' )}, ${
        forecastNow.desc
      }` }
    </h5>
    <BannerContainer>
      <BannerIcon src={ iconCodeMapping[forecastNow.icon] } />
      
      <Temperature>
        { Math.round( forecastNow.temp * 10 ) / 10 }
      </Temperature>
      
      <Unit>
        &deg; F
      </Unit>
      
      <div style={{ flex: '1' }} />
      
      <DetailContainer>
        <InfoText>
          Clouds: <b>{ forecastNow.clouds }%</b>
        </InfoText>
        
        <InfoText>
          Humidity: <b>{ forecastNow.humidity }%</b>
        </InfoText>
        
        <InfoText>
          Wind: { ' ' }
          <b>
            { forecastNow.wind } mph
          </b>
        </InfoText>
      </DetailContainer>
    </BannerContainer>
  </>
);

export default Banner;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BannerIcon = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Temperature = styled.div`
  font-size: 3rem;
  margin-left: 0.5rem;
  font-weight: bold;
`;

const Unit = styled.div`
  font-size: 1rem;
  margin-top: 0.7rem;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoText = styled.div`
  text-align: right;
`;
