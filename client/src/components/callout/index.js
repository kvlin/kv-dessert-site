import React from 'react';
import './index.css'



const index = ({ style }) => {

	return (
		<div className="card card-custom gutter-b bg-diagonal bg-diagonal-light-warning  " style={style}>
			<div className="card-body component-shadow">
				<div className="d-flex align-items-center justify-content-around p-4 flex-lg-wrap flex-xl-nowrap">
					<div className="d-flex flex-column">
						<h3 className=" mb-5">
							Contact
						</h3>
						<p className="">
							Message via Instagram or Wechat
						</p>
					</div>
					<div className="ml-6 ml-lg-0  flex-shrink-0">
						<a id="callout-contact-btn" href="/contact" style={{ color: "white" }}>
							<button className="getInTouchBtn  color-1">Get in touch</button>
						</a>
					</div>

				</div>
			</div>
		</div>
	)


}

export default index;