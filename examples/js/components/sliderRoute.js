
import React from 'react'
import Playground from 'component-playground'
import {Slider} from '../../../'

const defaultSlider = `<input type='range' min='0' max='100' />`
const defaultSliderWithSteps = `<input type='range' min='0' max='100' step='10' />`
const slider = `<Slider />`
const sliderWithSteps = `<Slider step={10} />`

export default class SliderRoute extends React.Component {

  render () {
    return (
      <div>
        <section>
          <h2>Default slider</h2>
          <Playground
            codeText={defaultSlider}
            scope={{React}}
          />
        </section>
        <section>
          <h2>Default slider with steps</h2>
          <Playground
            codeText={defaultSliderWithSteps}
            scope={{React}}
          />
        </section>
        <section>
          <h2>Slider</h2>
          <Playground
            docClass={Slider}
            codeText={slider}
            scope={{React, Slider}}
          />
        </section>
        <section>
          <h2>Slider with steps</h2>
          <Playground
            docClass={Slider}
            codeText={sliderWithSteps}
            scope={{React, Slider}}
          />
        </section>
      </div>
    )
  }

}
