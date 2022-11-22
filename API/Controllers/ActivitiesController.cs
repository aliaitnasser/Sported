using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAll()
        {
            var activities = await Mediator.Send(new List.Query());
            if (!activities.Any())
                return NotFound("No activities found!");
            return activities;
        }

        [HttpGet("{id}", Name = "GetById")]
        public async Task<ActionResult<Activity>> GetById(Guid id)
        {
            var activity = await Mediator.Send(new Details.Query { Id = id });
            if (activity == null)
                return NotFound("Activity Not Found!");
            return Ok(activity);
        }

        [HttpPost]
        public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
        {
            if(activity == null) return BadRequest("Activity is null!");
            await Mediator.Send(new Create.Command { Activity = activity });
            return CreatedAtRoute("GetById", new { id = activity.Id }, activity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Activity>> EditActivity(Guid id, Activity activity)
        {
            if(activity == null) return BadRequest("Activity is null!");
            activity.Id = id;
            return Ok(await Mediator.Send(new Update.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Activity>> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
