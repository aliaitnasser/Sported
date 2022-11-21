using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAll()
        {
            var activities = await _context.Activities.ToListAsync();
            if(!activities.Any())
                return NotFound("No activities found!");
            return activities;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetById(Guid id)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
            if(activity == null) return NotFound("Activity Not Found!");
            return Ok(activity);
        }
    }
}