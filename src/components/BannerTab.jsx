import 'react-tabs/style/react-tabs.css';

import React, {
  useState
} from 'react';
import moment from 'moment';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel
} from 'react-tabs';
import {
  AreaChart,
  Area,
  XAxis,
  LabelList
} from 'recharts';
import styled from 'styled-components';
import Banner from './Banner';

const BannerTab = ({
  location,
  forecastOfDay,
  unit
}) => {
  const [
    tabIndex
  ] = useState( 0 );

  const renderTabPanel = ( item, displayUnit ) => {
    return (
      <TabPanel key={`tp${item.dt}`}>
        <Banner
          forecastNow={ item }
          unit={ displayUnit }
        />
      </TabPanel>
    );
  };

  const renderTab = ( item ) => {
    if ( item ) {
      return (
        <Tab key={`t${item.dt}`}>
          { moment.unix( item.dt ).format( 'h:mm a' ) }
        </Tab>
      );
    }
    return <div />;
  };

  const formatTime = ( time ) => {
    return moment.unix( time ).format( 'h:mm a' )
  }

  const formatTemp = ( temp ) => {
    return Math.round( temp.payload.temp );
  }

  return (
    <Container>
      <LocationText>{ location }</LocationText>
      <Tabs
        selectedIndex={ tabIndex }
        onSelect={ false }>
        { forecastOfDay.map( ( item ) => renderTabPanel( item, unit ) ) }
        <TabList style={{ display: 'none' }}>
          { forecastOfDay.map( ( item ) => renderTab( item ) ) }
        </TabList>
      </Tabs>
      
      <TabContainer>
        <AreaChart
          width={ 450 }
          height={ 150 }
          data={ forecastOfDay }>
          <XAxis
            dataKey="dt"
            tickFormatter={ formatTime }
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#ffcc01"
            fill="#fef4ce">
            <LabelList
              valueAccessor={ formatTemp }
              position="top"
            />
          </Area>
        </AreaChart>
      </TabContainer>
    </Container>
  );
};

export default BannerTab;

const LocationText = styled.div`
  font-size: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TabContainer = styled.div`
  margin: 0.8rem;
  padding-bottom: 1.5rem;
`;
