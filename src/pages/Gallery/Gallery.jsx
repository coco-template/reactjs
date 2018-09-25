/**
 * @description - gallery showcase page
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React, { Component, Fragment } from 'react';
import { presets, spring, TransitionMotion } from 'react-motion';
import { fromEvent } from 'rxjs';
import { filter, map, scan } from 'rxjs/operators';
// internal
import styles from './Gallery.pcss';
// scope
const context = require.context('./asset/', false, /\.jpg$/);
const images = context
  .keys()
  .map(context)
  .map((image) => ({
    key: image,
    data: {
      url: image,
    },
  }));
const lastImageIndex = images.length - 1;

class Gallery extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    list: images.slice(0, 1),
  };

  interpolate = (items) => {
    const wrappers = items.map((item) => ({
      ...item,
      style: {
        opacity: item.style.x,
        transform: `translateX(${200 * (1 - item.style.x)}px)`,
      },
    }));

    return (
      <Fragment>
        {wrappers.map((item) => (
          <div key={item.key} style={item.style} className={styles.box}>
            <img
              src={item.data.url}
              className={styles.img}
              alt="Gallery Item"
            />
          </div>
        ))}
      </Fragment>
    );
  };

  willEnter = () => ({
    x: 0,
  });

  getDefaultStyles() {
    const { list } = this.state;

    return list.map((item) => ({
      ...item,
      style: {
        x: 0,
      },
    }));
  }

  getStyles() {
    const { list } = this.state;

    return list.map((item) => ({
      ...item,
      style: {
        x: spring(1, presets.gentle),
      },
    }));
  }

  componentDidMount() {
    this.list$ = fromEvent(document, 'keyup').pipe(
      map((event) => event.keyCode),
      // arrow right key-up
      filter((code) => code === 39),
      scan(
        (acc) => (acc >= lastImageIndex ? acc % lastImageIndex : acc + 1),
        0
      ),
      map((index) => ({
        list: images.slice(index, index + 1),
      }))
    );

    this.subscription = this.list$.subscribe((state) => this.setState(state));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    const defaultStyles = this.getDefaultStyles();
    const motionStyles = this.getStyles();

    return (
      <article className={styles.container}>
        <TransitionMotion
          defaultStyles={defaultStyles}
          styles={motionStyles}
          willEnter={this.willEnter}
        >
          {this.interpolate}
        </TransitionMotion>
      </article>
    );
  }
}

export default Gallery;
