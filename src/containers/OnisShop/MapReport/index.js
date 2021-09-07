import React, { Component } from "react";
import { connect } from "react-redux";
import { GetUserMapList } from "../../../actions/OnisShop/UserListAction";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.GetUserMapList({});
  }

  handleClick = (e) => {
    console.log(e.latlng);
  };

  render() {
    const { mapData } = this.props;
    console.log(
      mapData.filter((a) => a.longitude !== "11" && a.latitude !== "11")
    );
    const position = [47.92006479046048, 106.92200596960494];
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <Map
                  center={position}
                  zoom={13}
                  onClick={this.handleClick}
                  className="map-report-map"
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* <CircleMarker
                    center={position}
                    pathOptions={{ color: "red" }}
                    radius={20}
                  >
                    <Tooltip permanent direction="bottom">
                      <span>Tooltip for CircleMarker</span>
                    </Tooltip>
                  </CircleMarker> */}
                  {mapData.map((item, i) => {
                    if (item.longitude && item.latitude) {
                      if (item.longitude !== "11" && item.latitude !== "11") {
                        return (
                          <Marker
                            position={[item.latitude, item.longitude]}
                            key={i}
                          >
                            <Popup>
                              <span>
                                {item.storenm} <br /> {item.regno}
                              </span>
                            </Popup>
                          </Marker>
                        );
                      }
                    }
                  })}
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapData: state.shopUserList.mapData,
  };
}

export default connect(mapStateToProps, {
  GetUserMapList,
})(Components);
