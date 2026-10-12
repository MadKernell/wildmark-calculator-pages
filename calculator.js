export const units = {mm:0.001, cm:0.01, m:1, in:0.0254, ft:0.3048, yd:0.9144};
export const areas = {in2:0.0254**2, ft2:0.3048**2, cm2:0.01**2, m2:1};
export function calculate({width,height,sides,unit,priceUnit,rate}) {
  const values=[width,height,sides,rate].map(Number);
  if ([width,height,sides,rate].some(x=>x==='' || x===null) || values.some(x=>!Number.isFinite(x)) || !units[unit] || !areas[priceUnit]) return null;
  const [w,h,s,r]=values;
  if(w<=0 || h<=0 || s<1 || !Number.isInteger(s) || r<0) return null;
  const singleM2=w*h*units[unit]**2, area=singleM2*s/areas[priceUnit], total=area*r;
  if(!Number.isFinite(total)||!Number.isFinite(area)) return null;
  return {singleM2,area,total,sides:s};
}
export function convertLength(value,from,to) {return value===''?'': Number((Number(value)*units[from]/units[to]).toPrecision(12));}
export function convertRate(value,from,to) {return value===''?'': Number((Number(value)*areas[to]/areas[from]).toPrecision(12));}
