using Denemeee.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Denemeee.DataContext
{
	public class AccountDbContext : DbContext
	{
		public AccountDbContext() : base(nameOrConnectionString: "Myconnection")
		{

		}
		public virtual DbSet<Account> Accounts { get; set; }
		
	}
}