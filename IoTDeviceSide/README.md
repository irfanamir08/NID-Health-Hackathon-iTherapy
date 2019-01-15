RollPitchYawAngles
RollPitchYawAngles[r]

gives the roll-pitch-yaw angles {α,β,γ} corresponding to the rotation matrix r.

RollPitchYawAngles[r,{a,b,c}]

gives the roll-pitch-yaw angles {α,β,γ} corresponding to rotation order {a,b,c}.

Details
RollPitchYawAngles is used to decompose into fixed axis-oriented rotations.
RollPitchYawAngles[r,{a,b,c}] gives angles {α,β,γ} such that RollPitchYawMatrix[{α,β,γ},{a,b,c}]r.
RollPitchYawAngles[r] is equivalent to RollPitchYawAngles[r,{3,2,1}], the z-y-x rotation.
The default z-y-x angles RollPitchYawAngles[r,{3,2,1}] decompose rotation into three steps:

<img src="https://reference.wolfram.com/language/ref/Files/RollPitchYawAngles.en/Image_1.gif" height="122" width="507" class="" alt="">


The rotation axes a, b, and c can be any integer 1, 2, or 3, but there are only twelve combinations that are general enough to be able to specify any 3D rotation.
Rotations with the first and last axis repeated:
{3,2,3}	z-y-z rotation	
{3,1,3}	z-x-z rotation	
{2,3,2}	y-z-y rotation	
{2,1,2}	y-x-y rotation	
{1,3,1}	x-z-x rotation	
{1,2,1}	x-y-x rotation	
Rotations with all three axes different:
{1,2,3}	x-y-z rotation	
{1,3,2}	x-z-y rotation	
{2,1,3}	y-x-z rotation	
{2,3,1}	y-z-x rotation	
{3,1,2}	z-x-y rotation	
{3,2,1}	z-y-x rotation (default)	
Rotations with subsequent axes repeated may not be invertible since these are not capable of representing all possible rotations in 3D.


