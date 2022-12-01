using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        
        #region Login

        /// <summary>
        /// This is the login method
        /// </summary>
        /// <param name="loginDTO"></param>
        /// <returns> UserDTO or unauthorized </returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            //* Find the user by email
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);

            //* If the user is not found, return Unauthorized
            if (user == null) return Unauthorized();

            //* Check if the password is correct
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            //* If the password is correct, return the userdto
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            //* If the password is incorrect, return Unauthorized
            return Unauthorized();
        }

        #endregion
        
        #region Register

        /// <summary>
        /// This is the register method
        /// </summary>
        /// <param name="registerDTO"></param>
        /// <returns>userDTO or Bad request</returns>
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            //* Check if the email is already in use
            if(await _userManager.FindByEmailAsync(registerDTO.Email) != null)
            {
                ModelState.AddModelError("email", "Email is already in use");
                return ValidationProblem();
            }
            
            //* Check if the username is already in use
            if(await _userManager.FindByNameAsync(registerDTO.Username) != null)
            {
                ModelState.AddModelError("username", "Username is already in use");
                return ValidationProblem();
            }
            
            //* Create a new user
            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Username
            };

            //* Create the user
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            
            //* If the user is created, return the userdto
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            
            //* If the user is not created, return bad request
            return BadRequest("Problem registering user");
        }

        #endregion

        #region GetCurrentUser

        /// <summary>
        /// This method gets the current user object from the token and returns it
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }

        #endregion

        #region Create User Object

        /// <summary>
        /// This Helper method creates the userdto
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private UserDTO CreateUserObject(AppUser user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.createToken(user),
                Username = user.UserName
            };
        }

        #endregion
    }
}