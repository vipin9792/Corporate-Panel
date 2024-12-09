import React from 'react'

const SuccessFailPages = () => {
  return (
    <div>
       <style>
.path {stroke-dasharray: 0 !important;} 
</style> <![endif]--> 
<div class="container  p-5">
	<div class="row">
		<div class="col-12 text-center">
			<button type="button" class="btn btn-success m-1" data-bs-toggle="modal" data-bs-target="#statusSuccessModal">Success Modal</button>
			<button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#statusErrorsModal">Error Modal</button> 
		</div>
		<div class="d-flex justify-content-start align-items-center flex-column flex-md-row flex-wrap mt-5">
			<div class="box00 m-3" style="background: rgba(236,239,243,.2);box-shadow:0.67px 3.67px 8px #186edf3b;"></div>
			<div class="box00 m-3" style="background: rgba(236,239,243,.35);box-shadow: 0 0 10px #0000001a;;"></div>
			<div class="box00 m-3" style="background: rgb(245 246 248);box-shadow: -2px -3px 56px #186edf17, 2px 4px 14px #186edf14;"></div>
			<div class="box00 m-3" style="background: rgba(39,73,125,.14);box-shadow: 0 0 10px 5px rgb(0 0 0 / 15%);"></div>
			<div class="box00 m-3" style="background: rgba(255,255,255,1);box-shadow: 0 6px 65px #27497d17;"></div>
		</div>



		<div class="modal fade" id="statusErrorsModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false"> 
			<div class="modal-dialog modal-dialog-centered modal-sm" role="document"> 
				<div class="modal-content"> 
					<div class="modal-body text-center p-lg-4"> 
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
							<circle class="path circle" fill="none" stroke="#db3646" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" /> 
							<line class="path line" fill="none" stroke="#db3646" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
							<line class="path line" fill="none" stroke="#db3646" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" X2="34.4" y2="92.2" /> 
						</svg> 
						<h4 class="text-danger mt-3">Invalid email!</h4> 
						<p class="mt-3">This email is already registered, please login.</p>
						<button type="button" class="btn btn-sm mt-3 btn-danger" data-bs-dismiss="modal">Ok</button> 
					</div> 
				</div> 
			</div> 
		</div>
		<div class="modal fade" id="statusSuccessModal" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false"> 
			<div class="modal-dialog modal-dialog-centered modal-sm" role="document"> 
				<div class="modal-content"> 
					<div class="modal-body text-center p-lg-4"> 
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
							<circle class="path circle" fill="none" stroke="#198754" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
							<polyline class="path check" fill="none" stroke="#198754" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " /> 
						</svg> 
						<h4 class="text-success mt-3">Oh Yeah!</h4> 
						<p class="mt-3">You have successfully registered and logged in.</p>
						<button type="button" class="btn btn-sm mt-3 btn-success" data-bs-dismiss="modal">Ok</button> 
					</div> 
				</div> 
			</div> 
		</div>
	</div>
</div>
    </div>
  )
}

export default SuccessFailPages
