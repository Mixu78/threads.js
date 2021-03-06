class ThreadStore {
	/**
	 * Takes a `sharedArrayBuffer` and returns a `ThreadStore` that can set and get the values from it.
	 * @param {SharedArrayBuffer} sharedArrayBuffer Shared memory that another ThreadStore is using.
	 */
	constructor(sharedArrayBuffer) {
		this._dataview = new DataView(sharedArrayBuffer);
	}

	_setBool(byteOffset, value) { 
		if (value === true) this._dataview.setUint8(byteOffset, 1)
		else if (value === false) this._dataview.setUint8(byteOffset, 0)
		else throw new Error(`Property must be of type boolean. Was ${value}, type ${typeof value}.`)
	}

	_getBool(byteOffset) {
		const bool = this._dataview.getUint8(byteOffset);
		if (bool === 0) return false
		else if (bool === 1) return true
		else throw new Error(`Boolean value retrieved was ${bool}, expected 0 or 1.`)
	}

	set queued(value) { this._dataview.setInt32(0, value) }
	get queued() { return this._dataview.getInt32(0) }

	set working(value) { this._dataview.setInt32(4, value) }
	get working() { return this._dataview.getInt32(4) }
}

module.exports = ThreadStore