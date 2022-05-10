
const req = require.context('../../assets/icons/svg', false, /\.svg$/)
// const requireAll = (requireContext:any) => requireContext.keys().map

const requireAll = (requireContext:any) => requireContext.keys()
// .map(requireContext)
// requireAll(req)


const re = /\.\/(.*)\.svg/
const icons = requireAll(req).map((i:any)=> {
  return i.match(re)[1] 
})

export default icons
